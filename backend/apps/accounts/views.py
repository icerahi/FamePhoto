from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from rest_framework.authentication import BasicAuthentication,SessionAuthentication
from apps.accounts.permissions import ProfileOwnerOrReadOnly,ObjectOwnerOnlyAccess
from apps.accounts.serializers import UserProfileSerializer
from apps.accounts.models import Profile
from django.contrib.auth import get_user_model
from apps.albums.views import AlbumListCreateAPIView
from apps.albums.serializers import AlbumSerializer,AlbumInlineSerializer
from apps.albums.models import Album
from rest_framework.response import Response

from apps.albums.serializers import PhotoInlineSerializer

from apps.photos.models import Photo

from apps.photos.views import PhotoListCreateAPIView

User = get_user_model()

class ProfileAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [ProfileOwnerOrReadOnly]
    queryset    = User.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'username'

    def get_serializer_context(self):
        return {'request':self.request}


class UserPublicAlbumAPIView(AlbumListCreateAPIView):
    serializer_class    = AlbumInlineSerializer

    def get_queryset(self,*args, **kwargs):
        username = self.kwargs.get('username',None)
        if username is None:
            return Album.objects.none()
        return Album.objects.filter(user__username=username,keep_private=False)

 
class UserPrivateAlbumAPIView(UserPublicAlbumAPIView):
    permission_classes = [ObjectOwnerOnlyAccess]
    def get_queryset(self,*args, **kwargs):
        username = self.kwargs.get('username',None)
        if username is None:
            return Album.objects.none()
        return Album.objects.filter(user__username=username,keep_private=True)


class UserAllAlbumAPIView(UserPrivateAlbumAPIView):
    serializer_class = AlbumInlineSerializer

    def get_queryset(self, *args, **kwargs):
        username = self.kwargs.get('username', None)
        if username is None:
            return Album.objects.none()
        return Album.objects.filter(user__username=username, )

    def post(self, request, *args, **kwargs):
        return Response({'detail': 'Post request not allowed here!'}, status=400)


class UserPublicPhotoAPIView(PhotoListCreateAPIView):
    serializer_class = PhotoInlineSerializer

    def get_queryset(self, *args, **kwargs):
        username = self.kwargs.get('username', None)
        if username is None:
            return Photo.objects.none()
        return Photo.objects.filter(user__username=username, album__keep_private=False)


class UserPrivatePhotoAPIView(UserPublicPhotoAPIView):
    permission_classes = [ObjectOwnerOnlyAccess]

    def get_queryset(self, *args, **kwargs):
        username = self.kwargs.get('username', None)
        if username is None:
            return Photo.objects.none()
        return Photo.objects.filter(user__username=username, album__keep_private=True)

 

