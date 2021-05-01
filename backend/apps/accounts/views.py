from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication
from apps.accounts.permissions import ProfileOwnerOrReadOnly,ObjectOwnerOnly
from apps.accounts.serializers import UserProfileSerializer
from apps.accounts.models import Profile
from django.contrib.auth import get_user_model
from apps.albums.views import AlbumListCreateAPIView
from apps.albums.serializers import AlbumInlineSerializer
from apps.albums.models import Album
User = get_user_model()

class ProfileAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,ProfileOwnerOrReadOnly]
    authentication_classes = [SessionAuthentication,]
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
    permission_classes = [ObjectOwnerOnly]
    def get_queryset(self,*args, **kwargs):
        username = self.kwargs.get('username',None)
        if username is None:
            return Album.objects.none()
        return Album.objects.filter(user__username=username,keep_private=True)
    
    