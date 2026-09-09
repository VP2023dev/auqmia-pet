from datetime import date, timedelta

from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .availability import list_active_slots
from .models import Appointment
from .serializers import AppointmentSerializer, PublicBookingSerializer


class AppointmentViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Appointment.objects.select_related('customer', 'pet', 'service').all()
    serializer_class = AppointmentSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'], url_path='availability')
    def availability(self, request):
        today = date.today()
        date_from = request.query_params.get('from') or today.isoformat()
        date_to = request.query_params.get('to') or (today + timedelta(days=21)).isoformat()
        return Response({'slots': list_active_slots(date_from=date_from, date_to=date_to)})

    @action(detail=False, methods=['post'], url_path='book')
    def book(self, request):
        serializer = PublicBookingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        appointment = serializer.save()
        return Response(AppointmentSerializer(appointment).data, status=status.HTTP_201_CREATED)
