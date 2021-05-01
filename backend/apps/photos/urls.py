from django.urls import path 
from apps.photos import views


urlpatterns = [
    path('',views.PhotoListCreateAPIView.as_view(),name='list'),
    path('<int:id>/',views.PhotoDetailAPIView.as_view(),name='detail'),
    
]
