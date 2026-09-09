from datetime import datetime, timedelta

from .models import Appointment

ACTIVE_STATUSES = (Appointment.Status.PENDING, Appointment.Status.CONFIRMED)


def appointment_window(appointment: Appointment) -> tuple[datetime, datetime]:
    start = datetime.combine(appointment.appointment_date, appointment.appointment_time)
    duration = appointment.duration_minutes or 60
    return start, start + timedelta(minutes=duration)


def windows_overlap(start_a, end_a, start_b, end_b) -> bool:
    return start_a < end_b and end_a > start_b


def slot_is_taken(appointment_date, appointment_time, duration_minutes: int, exclude_id=None) -> bool:
    start = datetime.combine(appointment_date, appointment_time)
    end = start + timedelta(minutes=duration_minutes)
    queryset = Appointment.objects.filter(
        appointment_date=appointment_date,
        status__in=ACTIVE_STATUSES,
    )
    if exclude_id:
        queryset = queryset.exclude(pk=exclude_id)

    for appointment in queryset:
        booked_start, booked_end = appointment_window(appointment)
        if windows_overlap(start, end, booked_start, booked_end):
            return True
    return False


def list_active_slots(date_from=None, date_to=None):
    queryset = Appointment.objects.filter(status__in=ACTIVE_STATUSES)
    if date_from:
        queryset = queryset.filter(appointment_date__gte=date_from)
    if date_to:
        queryset = queryset.filter(appointment_date__lte=date_to)

    return [
        {
            'date': appointment.appointment_date.isoformat(),
            'time': appointment.appointment_time.strftime('%H:%M'),
            'duration_minutes': appointment.duration_minutes or 60,
        }
        for appointment in queryset
    ]
