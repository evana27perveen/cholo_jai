from django.db import models
from App_auth.models import *

# Create your models here.


class CurrentLocationModel(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_location')
    loc_cords_lat = models.CharField(max_length=300, blank=True, null=True)
    loc_cords_long = models.CharField(max_length=300, blank=True, null=True)
    loc_street = models.CharField(max_length=300, blank=True, null=True)
    loc_postalCode = models.CharField(max_length=300, blank=True, null=True)
    loc_city = models.CharField(max_length=300, blank=True, null=True)
    loc_region = models.CharField(max_length=300, blank=True, null=True)
    loc_country = models.CharField(max_length=300, blank=True, null=True)
    driver = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.user.email}'s currently Location"


class RideModel(models.Model):
    SAMPLE_TYPES = (
        ('Requested', 'Requested'),
        ('Accepted', 'Accepted'),
        ('On Ride', 'On Ride'),
        ('Completed', 'Completed'),
        ('Canceled', 'Canceled'),
        ('Payment Done', 'Payment Done'),
    )
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='passenger')
    user_cords_lat = models.CharField(max_length=300, blank=True, null=True)
    user_cords_long = models.CharField(max_length=300, blank=True, null=True)
    loc_cords_lat = models.CharField(max_length=300, blank=True, null=True)
    loc_cords_long = models.CharField(max_length=300, blank=True, null=True)
    user_location = models.CharField(max_length=300, blank=True, null=True)
    destination_location = models.CharField(max_length=300, blank=True, null=True)
    distance = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    cost = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Requested', choices=SAMPLE_TYPES)
    driver = models.ForeignKey(DriverModel, on_delete=models.CASCADE, related_name='assigned_driver', blank=True, null=True)

    def __str__(self):
        return f"{self.user.email}'s rides-{self.status}"
    
    class Meta:
        ordering = ['-date']


class TransactionModel(models.Model):
    ride = models.ForeignKey(RideModel, on_delete=models.CASCADE, related_name='payment')
    payment_method = models.CharField(max_length=50, default='cash')
    amount = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    status = models.BooleanField(default=False)
    payment_date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.ride.user.email}'s payment is - {self.status}"
    
    class Meta:
        ordering = ['-payment_date']


class FeedBackModel(models.Model):
    ride = models.ForeignKey(RideModel, on_delete=models.CASCADE, related_name='feed')
    rating = models.CharField(max_length=10, blank=True, null=True)
    complain = models.TextField(blank=True, null=True)
    datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ride.user.email}'s rating is - {self.rating} on {self.datetime}"
