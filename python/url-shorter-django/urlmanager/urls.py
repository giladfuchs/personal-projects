from django.urls import path
from todo import views

urlpatterns = [
    path('', views.api_index, name='api_index'),
    path('all', views.get_all_url, name='get_all_url'),
    path('create', views.create_url, name='create_url'),
    path('s/<str:id>', views.redirect_to_url, name='redirect_to_url'),
]
