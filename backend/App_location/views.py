from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

from App_auth.models import DriverModel
from .models import CurrentLocationModel, RideModel, TransactionModel
from .serializers import CurrentLocationSerializer, RideModelSerializer, TransactionModelSerializer
from rest_framework.response import Response
from rest_framework import status


class CurrentLocationUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CurrentLocationSerializer

    def put(self, request, *args, **kwargs):
        user = request.user
        current_location = get_object_or_404(CurrentLocationModel, user=user)
        serializer = CurrentLocationSerializer(current_location, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RideListCreateView(generics.ListCreateAPIView):
    serializer_class = RideModelSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return RideModel.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        transaction = TransactionModel.objects.create(ride=serializer.instance, amount=serializer.instance.cost)
        transaction.save()
        
        headers = self.get_success_headers(serializer.data)
        response_data = {
            "message": "Ride created successfully", 
            "data": serializer.data,
        }
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)


class RideRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RideModel.objects.all()
    serializer_class = RideModelSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    


class TransactionModelRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = TransactionModel.objects.all()
    serializer_class = TransactionModelSerializer

    def update(self, request, *args, **kwargs):
        ride_id = kwargs['ride_id']
        
        try:
            transaction = TransactionModel.objects.get(ride_id=ride_id)
        except TransactionModel.DoesNotExist:
            return Response({"error": f"Transaction for Ride with id {ride_id} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(transaction, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class RequestsAPIView(APIView):
    def get(self, request):
        requests = RideModel.objects.filter(status='Requested').order_by('-date')
        serializer = RideModelSerializer(requests, many=True)
        return Response({"requests": serializer.data})


class AcceptsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        ride_id = kwargs['ride_id']
        user = request.user
        driver = DriverModel.objects.get(user=user)
        request_ = RideModel.objects.get(pk=ride_id)
        request_.status = 'Accepted'
        request_.driver = driver
        request_.save()
        print(request_)
        return Response(status=status.HTTP_200_OK)


class DriverRideListView(generics.ListCreateAPIView):
    serializer_class = RideModelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        driver = DriverModel.objects.get(user=self.request.user)
        return RideModel.objects.filter(driver=driver)
