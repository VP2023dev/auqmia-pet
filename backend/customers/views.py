from rest_framework import mixins, viewsets

from .models import Customer
from .serializers import CustomerSerializer


class CustomerViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
