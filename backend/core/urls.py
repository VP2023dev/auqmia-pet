from django.urls import include, path
from rest_framework.routers import DefaultRouter

from appointments.views import AppointmentViewSet
from customers.views import CustomerViewSet
from pets.views import PetViewSet
from products.views import ProductViewSet
from services.views import ServiceViewSet

router = DefaultRouter()
router.register('services', ServiceViewSet, basename='service')
router.register('products', ProductViewSet, basename='product')
router.register('appointments', AppointmentViewSet, basename='appointment')
router.register('customers', CustomerViewSet, basename='customer')
router.register('pets', PetViewSet, basename='pet')

urlpatterns = [
    path('', include(router.urls)),
]
