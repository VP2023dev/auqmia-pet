from django.db import transaction
from rest_framework import serializers

from customers.models import Customer
from pets.models import Pet
from services.models import Service

from .availability import slot_is_taken
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = (
            'id',
            'customer',
            'pet',
            'service',
            'extra_services',
            'appointment_date',
            'appointment_time',
            'duration_minutes',
            'status',
            'notes',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('id', 'status', 'created_at', 'updated_at')


class PublicBookingSerializer(serializers.Serializer):
    service_names = serializers.ListField(child=serializers.CharField(), min_length=1)
    duration_minutes = serializers.IntegerField(min_value=15)
    pet_name = serializers.CharField(max_length=120)
    species = serializers.ChoiceField(choices=Pet.Species.choices)
    breed = serializers.CharField(max_length=80)
    size = serializers.ChoiceField(choices=Pet.Size.choices)
    age = serializers.CharField(max_length=40, required=False, allow_blank=True)
    notes = serializers.CharField(required=False, allow_blank=True)
    tutor_name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=20)
    email = serializers.EmailField()
    appointment_date = serializers.DateField()
    appointment_time = serializers.TimeField()

    def validate(self, attrs):
        if slot_is_taken(attrs['appointment_date'], attrs['appointment_time'], attrs['duration_minutes']):
            raise serializers.ValidationError(
                {'appointment_time': 'Esse horário acabou de ser preenchido. Escolha outro.'}
            )
        return attrs

    def create(self, validated_data):
        service_names = validated_data.pop('service_names')
        duration_minutes = validated_data.pop('duration_minutes')
        age = validated_data.pop('age', '')
        notes = validated_data.pop('notes', '')

        with transaction.atomic():
            if slot_is_taken(
                validated_data['appointment_date'],
                validated_data['appointment_time'],
                duration_minutes,
            ):
                raise serializers.ValidationError(
                    {'appointment_time': 'Esse horário acabou de ser preenchido. Escolha outro.'}
                )

            customer, _ = Customer.objects.get_or_create(
                phone=validated_data['phone'],
                defaults={
                    'name': validated_data['tutor_name'],
                    'email': validated_data['email'],
                },
            )
            if customer.name != validated_data['tutor_name'] or customer.email != validated_data['email']:
                customer.name = validated_data['tutor_name']
                customer.email = validated_data['email']
                customer.save(update_fields=['name', 'email', 'updated_at'])

            pet, _ = Pet.objects.get_or_create(
                customer=customer,
                name=validated_data['pet_name'],
                defaults={
                    'species': validated_data['species'],
                    'breed': validated_data['breed'],
                    'size': validated_data['size'],
                    'notes': notes,
                },
            )

            primary_name = service_names[0]
            service, _ = Service.objects.get_or_create(
                name=primary_name,
                defaults={
                    'description': primary_name,
                    'price': 0,
                    'estimated_duration': duration_minutes,
                    'active': True,
                },
            )

            extra = ', '.join(service_names[1:])
            combined_notes = notes
            if age:
                combined_notes = f'Idade: {age}. {combined_notes}'.strip()

            return Appointment.objects.create(
                customer=customer,
                pet=pet,
                service=service,
                extra_services=extra,
                appointment_date=validated_data['appointment_date'],
                appointment_time=validated_data['appointment_time'],
                duration_minutes=duration_minutes,
                notes=combined_notes,
                status=Appointment.Status.PENDING,
            )
