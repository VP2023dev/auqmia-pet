from django.db import models

from core.models import TimeStampedModel
from customers.models import Customer
from pets.models import Pet
from services.models import Service


class Appointment(TimeStampedModel):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pendente'
        CONFIRMED = 'confirmed', 'Confirmado'
        COMPLETED = 'completed', 'Concluído'
        CANCELLED = 'cancelled', 'Cancelado'

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='appointments')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='appointments')
    service = models.ForeignKey(Service, on_delete=models.PROTECT, related_name='appointments')
    appointment_date = models.DateField('Data')
    appointment_time = models.TimeField('Horário')
    duration_minutes = models.PositiveIntegerField('Duração (minutos)', default=60)
    extra_services = models.CharField('Serviços extras', max_length=255, blank=True)
    status = models.CharField('Status', max_length=20, choices=Status.choices, default=Status.PENDING)
    notes = models.TextField('Observações', blank=True)

    class Meta:
        verbose_name = 'Agendamento'
        verbose_name_plural = 'Agendamentos'
        ordering = ['-appointment_date', '-appointment_time']

    def __str__(self) -> str:
        return f'{self.pet.name} — {self.service.name} em {self.appointment_date}'
