from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):

        # Check to see if this request is read-only (GET)
        # If it is, we will authorise the user to acces the view by returning True
        if request.method in SAFE_METHODS:
            return True

        # If the request is a write operation, we want to ensure the request user owns the object
        return obj.user == request.user
