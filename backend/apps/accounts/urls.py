from django.urls import path
from apps.accounts import views
urlpatterns = [
    path('<username>/',views.ProfileAPIView.as_view(),name='profile'),
    path('<username>/public/albums/',views.UserPublicAlbumAPIView.as_view(),name='public_albums'),
    path('<username>/private/albums/',views.UserPrivateAlbumAPIView.as_view(),name='private_albums'),
    path('<username>/all_albums/',views.UserAllAlbumAPIView.as_view(),name='all_albums'),
]
