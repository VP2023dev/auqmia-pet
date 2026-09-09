from django.db import models

from core.models import TimeStampedModel
from customers.models import Customer
from products.models import Product


class Sale(TimeStampedModel):
    class Status(models.TextChoices):
        OPEN = 'open', 'Aberta'
        PAID = 'paid', 'Paga'
        CANCELLED = 'cancelled', 'Cancelada'

    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='sales')
    status = models.CharField('Status', max_length=20, choices=Status.choices, default=Status.OPEN)
    total = models.DecimalField('Total', max_digits=10, decimal_places=2, default=0)

    class Meta:
        verbose_name = 'Venda'
        verbose_name_plural = 'Vendas'
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f'Venda #{self.pk} — {self.customer.name}'


class SaleItem(TimeStampedModel):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField('Quantidade', default=1)
    unit_price = models.DecimalField('Preço unitário', max_digits=8, decimal_places=2)

    class Meta:
        verbose_name = 'Item da venda'
        verbose_name_plural = 'Itens da venda'

    def __str__(self) -> str:
        return f'{self.product.name} x{self.quantity}'
