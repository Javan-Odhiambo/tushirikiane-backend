from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow:
    - Owners to perform any action (read, update, delete).
    - Members to only read (view) the workspace.
    """

    def has_object_permission(self, request, view, obj):
        # Allow read-only access for all requests (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow full access only if the user is the owner
        return obj.owner == request.user
    
class IsOwner(permissions.BasePermission):
    """
    Custom permission to allow only the owner to perform any action (read, update, delete).
    """

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
    
class IsMemberOrOwnerFull(permissions.BasePermission):
    """
    Custom permission to allow:
    - Members to perform any action (read, update, delete).
    - Owners to perform any action (read, update, delete).
    """

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or obj.members.filter(member=request.user).exists() 
    

class IsMemberReadOrOwnerFull(permissions.BasePermission):
    """
    Permission class to grant read-only access to members and full access to the owner.
    Methods:
        has_object_permission(request, view, obj):
            Checks if the user has permission to access the object.
            - Returns True if the user is a member and the request method is safe (read-only).
            - Returns True if the user is the owner of the object.
            - Otherwise, returns False.
    """

    def has_object_permission(self, request, view, obj):
        if obj.members.filter(member=request.user).exists() and request.method in permissions.SAFE_METHODS :
            return True

        return obj.owner == request.user
    
