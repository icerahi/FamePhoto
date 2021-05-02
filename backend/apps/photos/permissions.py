from rest_framework import permissions
from apps.photos.models import Photo 


class PrivateAndPublicAlbumsPhotoPermission(permissions.BasePermission):

    message = "Only Owner can access this!!"

    """
    Only Album Owner can view and update private albums Photo, keep restricted private albums photo and keep
    readonly public albums photo for others
     """

    def has_permission(self, request,view):
        obj = Photo.objects.get(id=view.kwargs.get('id'))

        if obj.user == request.user:
            return True
 
        if obj.album.keep_private == False and obj.user!= request.user:
            return True

    """ object level permission ,Is Owner of object or Keep readonly for others"""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        
        if obj.user == request.user:
            return True
      