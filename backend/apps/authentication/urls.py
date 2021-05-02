from django.urls import path 
from rest_framework_jwt.views import obtain_jwt_token , refresh_jwt_token
from apps.authentication import views
urlpatterns = [
    # path('login/',obtain_jwt_token),#default jwt login
    path('login/',views.AuthAPIView.as_view(),name='login'),
    path('token_refresh/',refresh_jwt_token),
]
