from django.contrib import admin

from .models import Pet


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ('name', 'customer', 'species', 'breed', 'size', 'created_at')
    search_fields = ('name', 'breed', 'customer__name')
    list_filter = ('species', 'size')
    ordering = ('name',)
