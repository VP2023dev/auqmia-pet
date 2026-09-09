from rest_framework import mixins, viewsets

from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Service.objects.filter(active=True)
    serializer_class = ServiceSerializer
