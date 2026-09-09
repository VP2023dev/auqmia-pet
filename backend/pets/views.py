from rest_framework import mixins, viewsets

from .models import Pet
from .serializers import PetSerializer


class PetViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Pet.objects.select_related('customer').all()
    serializer_class = PetSerializer
