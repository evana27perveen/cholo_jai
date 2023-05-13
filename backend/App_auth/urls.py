from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from App_auth.views import *


app_name = 'App_auth'


urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name="registration"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('profile-view/', UserProfileModelAPIView.as_view()),
    # path('profile-update-view/', profile_update_api_view),
    # path('login/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

