from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from apps.accounts.permissions import ObjectOwnerOrReadOnly
from apps.albums.models import Album
from apps.albums.serializers import AlbumSerializer,AlbumInlineSerializer
from rest_framework.authentication import SessionAuthentication,BasicAuthentication
 # Create your views here.

class AlbumListCreateAPIView(generics.ListCreateAPIView):
    queryset                = Album.objects.public()
    serializer_class        = AlbumInlineSerializer
    permission_classes      = [permissions.IsAuthenticatedOrReadOnly,]
    authentication_classes  = [BasicAuthentication,SessionAuthentication]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AlbumDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset               = Album.objects.public()
    serializer_class       = AlbumSerializer
    permission_classes     = [permissions.IsAuthenticatedOrReadOnly,ObjectOwnerOrReadOnly]
    authentication_classes = [BasicAuthentication,SessionAuthentication]
    lookup_field           = "id"