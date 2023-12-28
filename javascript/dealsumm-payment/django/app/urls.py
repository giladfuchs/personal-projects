
from django.urls import path
from .views import get_dataset, get_series

urlpatterns = [
    path('get_dataset/', get_dataset, name='get_dataset'),
    path('get_series/', get_series, name='get_series'),
]
