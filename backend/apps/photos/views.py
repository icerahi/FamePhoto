from django.shortcuts import render
from rest_framework import generics,permissions
from apps.photos.models import Photo
from apps.photos.serializers import PhotoSerializer
from rest_framework.authentication import SessionAuthentication,BasicAuthentication
from apps.accounts.permissions import ObjectOwnerOrReadOnly
from apps.photos.permissions import PrivateAndPublicAlbumsPhotoPermission


class PhotoListCreateAPIView(generics.ListCreateAPIView):
    #permission_classes=[permissions.IsAuthenticatedOrReadOnly,]
    #authentication_classes=[SessionAuthentication,BasicAuthentication]
    queryset         = Photo.objects.public().order_by('-created')
    serializer_class = PhotoSerializer   

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_context(self):
        return {'request':self.request}

      


class PhotoDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes     = [PrivateAndPublicAlbumsPhotoPermission]
    # authentication_classes = [BasicAuthentication,SessionAuthentication]
    queryset         = Photo.objects.all().order_by('-created')
    serializer_class = PhotoSerializer
    lookup_field     = 'id'

    def get_serializer_context(self):
        return {'request':self.request}


 

