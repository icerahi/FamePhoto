from rest_framework import permissions

class AnonUserPermissionOnly(permissions.BasePermission):
    message = "You are already authenticated. Please logout to and try again!!"
    
    """ This permission is for only Non-authenticated user"""
    # if user is not authenticated
    def has_permission(self,request,view):
        return not request.user.is_authenticated