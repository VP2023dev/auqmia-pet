from django.db import models

from core.models import TimeStampedModel
from customers.models import Customer


class Pet(TimeStampedModel):
    class Species(models.TextChoices):
        DOG = 'cao', 'Cão'
        CAT = 'gato', 'Gato'
        OTHER = 'outro', 'Outro'

    class Size(models.TextChoices):
        SMALL = 'pequeno', 'Pequeno'
        MEDIUM = 'medio', 'Médio'
        LARGE = 'grande', 'Grande'

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='pets', verbose_name='Tutor')
    name = models.CharField('Nome', max_length=120)
    species = models.CharField('Espécie', max_length=20, choices=Species.choices)
    breed = models.CharField('Raça', max_length=80)
    size = models.CharField('Porte', max_length=20, choices=Size.choices)
    birth_date = models.DateField('Data de nascimento', blank=True, null=True)
    weight = models.DecimalField('Peso (kg)', max_digits=5, decimal_places=2, blank=True, null=True)
    notes = models.TextField('Observações', blank=True)

    class Meta:
        verbose_name = 'Pet'
        verbose_name_plural = 'Pets'
        ordering = ['name']

    def __str__(self) -> str:
        return f'{self.name} ({self.customer.name})'
