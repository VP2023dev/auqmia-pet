from django.contrib import admin

from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'is_staff_member', 'created_at')
    search_fields = ('user__username', 'user__email', 'phone')
    list_filter = ('is_staff_member',)
    ordering = ('-created_at',)
