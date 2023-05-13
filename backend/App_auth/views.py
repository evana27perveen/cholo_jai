from django.shortcuts import render
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework import renderers
from rest_framework_simplejwt.views import TokenObtainPairView

from App_auth.serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
import json

from App_auth.serializers import RegisterSerializer

from django.core import serializers

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser


# Create your views here.
class RegisterAPIView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializers_ = self.get_serializer(data=request.data, context={"groups": request.data['group']})
        if serializers_.is_valid():
            self.perform_create(serializers_)
            return Response(serializers_.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializers_.error, status=status.HTTP_400_BAD_REQUEST)


def getToken(user):
    refreshToken = RefreshToken.for_user(user)
    return {
        'refresh': str(refreshToken),
        'access': str(refreshToken.access_token)
    }


class UserRendering(renderers.JSONRenderer):
    charset = 'utf-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''
        if 'ErrorDetail' in str(data):
            response = json.dumps({'error': data})
        else:
            response = json.dumps(data)

        return response


class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='CUSTOMER'):
            return True
        return False


def is_customer(user):
    return user.groups.filter(name="CUSTOMER").exists()


def is_driver(user):
    return user.groups.filter(name="DRIVER").exists()


class UserLoginView(TokenObtainPairView):
    renderer_classes = [UserRendering]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        if user:
            refreshToken = RefreshToken.for_user(user)
            grp = groups = Group.objects.filter(user=user)
            group_names = [group.name for group in groups][0]
            profile = ProfileModel.objects.get(user=user)
            if profile.phone_number is None:
                profile_status = False
            else:
                profile_status = True

            return Response({
                'refreshToken': str(refreshToken),
                'accessToken': str(refreshToken.access_token),
                'alert': 'Login Success',
                'group': group_names,
                'profile': str(profile_status)
            }, status=status.HTTP_200_OK)
        else:
            return Response({"alert": "Failed!"}, status=status.HTTP_404_NOT_FOUND)



class UserProfileModelAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def get_object(self, user):
        try:
            return ProfileModel.objects.get(user=user)
        except ProfileModel.DoesNotExist:
            return None

    def get(self, request, format=None):
        profile = self.get_object(request.user)
        if profile is not None:
            serializer = ProfileModelSerializer(profile)
            return Response(serializer.data)
        else:
            return Response({"message": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, format=None):
        user = request.user
        profile = self.get_object(user)
        data = request.data.copy()
        data["user"] = user.id
        if profile is not None:
            serializer = ProfileModelSerializer(profile, data=data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = ProfileModelSerializer(data=data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['POST'])
# # @permission_classes(['IsAuthenticated'])
# def profile_update_api_view(request):
#     if request.method == 'POST':
#         profile = ProfileModel.objects.get(user=request.user)
#         profile.full_name = request.data['full_name']
#         profile.phone_number = request.data['phone_number']
#         try:
#             profile.profile_picture = request.FILES['profile_picture']
#         except:
#             print("File not Found")
#         profile.save()

#         return Response({"success": "Successfully Updated!!!"})
#     return Response({"error": "Update failed"})
