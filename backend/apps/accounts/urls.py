from django.urls import path,re_path
from apps.accounts import views
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
    path('<username>/',views.ProfileAPIView.as_view(),name='profile'),
    path('<username>/public/albums/',views.UserPublicAlbumAPIView.as_view(),name='public_albums'),
    path('<username>/private/albums/',views.UserPrivateAlbumAPIView.as_view(),name='private_albums'),
    path('<username>/all_albums/',views.UserAllAlbumAPIView.as_view(),name='all_albums'), # need to hit when create a new photo
    path('<username>/public/photos/', views.UserPublicPhotoAPIView.as_view(), name='public_photos'),
    path('<username>/private/private/', views.UserPrivatePhotoAPIView.as_view(), name='private_photos'),
    path('',views.AccountListApiView.as_view(), name='user_list'),
    re_path(r'^upload/(?P<filename>[^/]+)$', csrf_exempt(views.FileUploadView.as_view()))

]
 