from rest_framework import permissions
from apps.albums.models import Album 


class PrivateAlbumOwneronly(permissions.BasePermission):

    message = "Only Owner can access this!!"
    """
    permisson check for private album owner or not
     """
    def has_permission(self, request,view):
        obj = Album.objects.get(id=view.kwargs.get('id'))
     
        if obj.user == request.user:
            return True
 
        if obj.keep_private == False and obj.user!= request.user:
            return True
     
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        
        if obj.user == request.user:
            return True
      