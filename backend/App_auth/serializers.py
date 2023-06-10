from cProfile import Profile
from rest_framework import serializers
from django.contrib.auth.models import Group
from App_auth.models import *
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import Group

from django.db import transaction
from App_location.models import *



class ProfileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = '__all__'

    # def create(self, validated_data):
    #     full_name = validated_data['full_name']
    #     phone_number = validated_data['phone_number']
    #     profile_picture = validated_data['profile_picture']
    #     user = self.context.get('user')
    #     profile = ProfileModel.objects.create(user=user, full_name=full_name, phone_number=phone_number,
    #                                           profile_picture=profile_picture)
    #     return profile


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('password', 'email')

        extra_kwargs = {
            'password': {'write_only': True}
        }

    @transaction.atomic
    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        group_l = self.context.get('groups')
        grp = Group.objects.get_or_create(name=group_l)
        user.save()
        grp[0].user_set.add(user)

        profile = ProfileModel.objects.create(user=user)
        profile.save()
        
        current_location = CurrentLocationModel.objects.create(user=user)
        current_location.save()

        return user


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'groups']


class UserUpdatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email']


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = CustomUser
        fields = ['email', 'password']


