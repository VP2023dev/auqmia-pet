from django.contrib import admin

from .models import Sale, SaleItem


class SaleItemInline(admin.TabularInline):
    model = SaleItem
    extra = 0


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'status', 'total', 'created_at')
    search_fields = ('customer__name',)
    list_filter = ('status', 'created_at')
    ordering = ('-created_at',)
    inlines = [SaleItemInline]
