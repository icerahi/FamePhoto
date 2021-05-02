from django.urls import path 
from rest_framework_jwt.views import obtain_jwt_token , refresh_jwt_token
urlpatterns = [
    path('login/',obtain_jwt_token),#default jwt login
    path('token_refresh/',refresh_jwt_token),
]
