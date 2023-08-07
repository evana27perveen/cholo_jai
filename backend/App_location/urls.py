from django.urls import path
from App_auth.views import *
from .views import CurrentLocationUpdateView, RideListCreateView, RideRetrieveUpdateDeleteView, TransactionModelRetrieveUpdateView


app_name = 'App_location'


urlpatterns = [
    path('current-location/', CurrentLocationUpdateView.as_view()),
    path('rides/', RideListCreateView.as_view(), name='ride-list-create'),
    path('rides/<int:pk>/', RideRetrieveUpdateDeleteView.as_view(), name='ride-retrieve-update-delete'),
    path('payment/<int:ride_id>/', TransactionModelRetrieveUpdateView.as_view(),
         name='payment'),
]