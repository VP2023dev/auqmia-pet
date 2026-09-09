from django.conf import settings
from django.db import models

from core.models import TimeStampedModel


class Profile(TimeStampedModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField('Telefone', max_length=20, blank=True)
    is_staff_member = models.BooleanField('Equipe da loja', default=False)

    class Meta:
        verbose_name = 'Perfil'
        verbose_name_plural = 'Perfis'

    def __str__(self) -> str:
        return self.user.get_username()
