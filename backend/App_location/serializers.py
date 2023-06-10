from rest_framework import serializers
from .models import CurrentLocationModel

class CurrentLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentLocationModel
        fields = '__all__'
