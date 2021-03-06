from rest_framework import permissions
from apps.albums.models import Album 


class PrivateAndPublicAlbumPermission(permissions.BasePermission):
    message = "Only Owner can access this!!"
    """
    Only Album Owner can view and update private album, keep restricted private album and keep
    readonly public album for others
     """
    def has_permission(self, request,view):
        obj = Album.objects.get(id=view.kwargs.get('id'))

        if obj.user == request.user:
            return True
 
        if obj.keep_private == False and obj.user!= request.user:
            return True

    """ object level permission ,Is Owner of object or Keep readonly for others"""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        
        if obj.user == request.user:
            return True
      