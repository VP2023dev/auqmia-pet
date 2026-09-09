from django.db import models

from core.models import TimeStampedModel


class Customer(TimeStampedModel):
    name = models.CharField('Nome', max_length=150)
    email = models.EmailField('E-mail')
    phone = models.CharField('Telefone', max_length=20)

    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.name
