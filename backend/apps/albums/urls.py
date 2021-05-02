from django.urls import path
from apps.albums import views

urlpatterns = [
    path('',views.AlbumListCreateAPIView.as_view(),name='list'),
    path('<int:id>/',views.AlbumDetailAPIView.as_view(),name='detail'),
  
]
