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
