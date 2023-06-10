from django.urls import path
from App_auth.views import *
from .views import CurrentLocationUpdateView


app_name = 'App_location'


urlpatterns = [
    path('current-location/', CurrentLocationUpdateView.as_view()),
]