from rest_framework import serializers
from .models import CurrentLocationModel, RideModel, TransactionModel, FeedBackModel


class CurrentLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentLocationModel
        fields = '__all__'

class RideModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = RideModel
        fields = '__all__'
        
        extra_kwargs = {
            'user': {'read_only': True}
        }


class TransactionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionModel
        fields = '__all__'
        
        extra_kwargs = {
            'ride': {'read_only': True}
        }


class FeedBackModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBackModel
        fields = '__all__'
