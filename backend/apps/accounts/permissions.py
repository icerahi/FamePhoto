from rest_framework import permissions
from apps.albums.models import Album

class ObjectOwnerOrReadOnly(permissions.BasePermission):
    message = "You must be the owner of this content to make update"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        
        if obj.user == request.user:
            return True
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True 
                

class ObjectOwnerOnly(permissions.BasePermission):

    message = "Only Owner can access this!!"
    """
    permisson check for private album owner or not
     """

    def has_permission(self, request, view):
        user = request.user
        if user.username == view.kwargs.get('username'):
            return True


class ProfileOwnerOrReadOnly(permissions.BasePermission):
    message = "You must be the owner of this conent to make update"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        
        if obj == request.user:
            return True