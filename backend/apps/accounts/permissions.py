from rest_framework import permissions
from apps.albums.models import Album


## can usable globally
class ObjectOwnerOrReadOnly(permissions.BasePermission):
    message = "You must be the owner of this content to make update"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        
        if obj.user == request.user:
            return True
    
     
## only usable for accounts app ,with <username> url parameter
class ObjectOwnerOnlyAccess(permissions.BasePermission):

    message = "Only Owner can access this!!"
    """
    permisson check for  album owner or not, and global restricted for others
     """

    def has_permission(self, request, view):
        user = request.user
        if user.username == view.kwargs.get('username'):
            return True


## only usable for accounts app's profile view
class ProfileOwnerOrReadOnly(permissions.BasePermission):
    message = "You must be the owner of this conent to make update"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        
        if obj == request.user:
            return True