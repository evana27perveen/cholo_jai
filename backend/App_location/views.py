from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import CurrentLocationModel
from .serializers import CurrentLocationSerializer
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
