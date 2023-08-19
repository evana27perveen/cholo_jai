from django.urls import path
from App_auth.views import *
from .views import CurrentLocationUpdateView, RideListCreateView, RideRetrieveUpdateDeleteView, \
    TransactionModelRetrieveUpdateView, RequestsAPIView, AcceptsAPIView, DriverRideListView

app_name = 'App_location'


urlpatterns = [
    path('current-location/', CurrentLocationUpdateView.as_view()),
    path('my-rides/', DriverRideListView.as_view(), name='my-rides'),
    path('rides/', RideListCreateView.as_view(), name='ride-list-create'),
    path('rides/<int:pk>/', RideRetrieveUpdateDeleteView.as_view(), name='ride-retrieve-update-delete'),
    path('payment/<int:ride_id>/', TransactionModelRetrieveUpdateView.as_view(),
         name='payment'),
    path('requests/', RequestsAPIView.as_view(), name='requests'),
    path('accepts/<int:ride_id>/', AcceptsAPIView.as_view(), name='accepts'),
]
