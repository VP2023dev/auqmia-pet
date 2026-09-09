from django.db import models

from core.models import TimeStampedModel


class Service(TimeStampedModel):
    name = models.CharField('Nome', max_length=120)
    description = models.TextField('Descrição')
    price = models.DecimalField('Preço', max_digits=8, decimal_places=2)
    estimated_duration = models.PositiveIntegerField('Duração estimada (minutos)')
    active = models.BooleanField('Ativo', default=True)

    class Meta:
        verbose_name = 'Serviço'
        verbose_name_plural = 'Serviços'
        ordering = ['name']

    def __str__(self) -> str:
        return self.name
