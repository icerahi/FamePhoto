from django.shortcuts import render
from rest_framework import generics,permissions
from apps.photos.models import Photo
from apps.photos.serializers import PhotoSerializer
from rest_framework.authentication import SessionAuthentication,BasicAuthentication
from apps.accounts.permissions import ObjectOwnerOrReadOnly

class PhotoListCreateAPIView(generics.ListCreateAPIView):
    permission_classes=[permissions.IsAuthenticatedOrReadOnly,]
    authentication_classes=[SessionAuthentication,BasicAuthentication]
    queryset         = Photo.objects.public().order_by('-created')
    serializer_class = PhotoSerializer   

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PhotoDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=[permissions.IsAuthenticatedOrReadOnly,ObjectOwnerOrReadOnly]
    authentication_classes=[SessionAuthentication,]
    queryset         = Photo.objects.public().order_by('-created')
    serializer_class = PhotoSerializer
    lookup_field     = 'id'

 

