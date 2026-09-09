from django.contrib import admin

from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('pet', 'service', 'extra_services', 'customer', 'appointment_date', 'appointment_time', 'duration_minutes', 'status')
    search_fields = ('pet__name', 'customer__name', 'service__name')
    list_filter = ('status', 'appointment_date', 'service')
    ordering = ('-appointment_date', '-appointment_time')
