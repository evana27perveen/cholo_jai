import imp
from django.contrib import admin
from App_location.models import *

# Register your models here.
admin.site.register(CurrentLocationModel)
admin.site.register(RideModel)
admin.site.register(TransactionModel)
admin.site.register(FeedBackModel)
