from django.contrib import admin

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'estimated_duration', 'active', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('active',)
    ordering = ('name',)
