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

            return Response({'refreshToken': str(refreshToken), 'accessToken': str(refreshToken.access_token),
                             'alert': 'Login Success', 'group': group_names },
                            status=status.HTTP_200_OK)
        else:
            return Response({"alert": "Failed!"}, status=status.HTTP_404_NOT_FOUND)


class UserProfileModelAPIView(ListCreateAPIView):
    permission_classes = [IsAuthenticated, ]
    # queryset = ProfileModel.objects.all()
    serializer_class = ProfileModelSerializer

    def get(self, request, *args, **kwargs):
        queryset = ProfileModel.objects.get(user=request.user)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)

    def post(self, request, format=None, **kwargs):
        serializer = ProfileModelSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response({'alert': 'Profile set.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def put()


@api_view(['POST'])
# @permission_classes(['IsAuthenticated'])
def profile_update_api_view(request):
    if request.method == 'POST':
        profile = ProfileModel.objects.get(user=request.user)
        profile.full_name = request.data['full_name']
        profile.phone_number = request.data['phone_number']
        try:
            profile.profile_picture = request.FILES['profile_picture']
        except:
            print("File not Found")
        profile.house = request.data['house']
        profile.area = request.data['area']
        profile.city = request.data['city']
        profile.save()

        return Response({"success": "Successfully Updated!!!"})
    return Response({"error": "Update failed"})
