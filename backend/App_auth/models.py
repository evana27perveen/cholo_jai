from random import choices
from secrets import choice
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models
from django.core.validators import *
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _


# Create your models here.


class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        # Create a profile for the user
        ProfileModel.objects.create(user=user)

        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email,
                                password=password,
                                **extra_fields
                                )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=False)
    password = models.CharField(max_length=100)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log in this site')
    )

    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. Unselect this instead of deleting accounts')
    )

    USERNAME_FIELD = 'email'
    objects = MyUserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email


phone_regex = RegexValidator(
    regex=r"^\+?(88)01[3-9][0-9]{8}$", message=_('Must add 880'))


class ProfileModel(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=264, blank=True, null=True)
    phone_number = models.CharField(validators=[phone_regex], verbose_name=_("Mobile phone"), max_length=17,
                                    blank=True, null=True)
    profile_picture = models.ImageField(
        blank=True, null=True, upload_to='profile_pic/')
    date_joined = models.DateTimeField(auto_now=True)
    auth_token = models.CharField(max_length=100, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.full_name}'s Profile"

    def get_user_email(self):
        return self.user.email

    def is_fully_filled(self):
        fields_names = [f.name for f in self._meta.get_fields()]
        for field_name in fields_names:
            value = getattr(self, field_name)
            if value is None or value == '':
                return False
        return True
