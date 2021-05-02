from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from apps.accounts.permissions import ObjectOwnerOrReadOnly,ObjectOwnerOnly
from apps.albums.permissions import PrivateAlbumOwneronly
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

    def get_serializer_context(self):
        return {'request':self.request}



class AlbumDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset               = Album.objects.all()
    serializer_class       = AlbumSerializer
    permission_classes     = [permissions.IsAuthenticatedOrReadOnly,PrivateAlbumOwneronly]
    authentication_classes = [BasicAuthentication,SessionAuthentication]
    lookup_field           = "id"
    

    def get_serializer_context(self):
        return {'request':self.request}

 
    

 

        
