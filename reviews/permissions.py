from rest_framework import permissions

from guide.models import Partner


class NotIsPartner(permissions.IsAuthenticated):

    def has_permission(self, request, view):
        base_permission = super(NotIsPartner, self).has_permission(request, view)
        if request.method in permissions.SAFE_METHODS:
            return True

        if not base_permission:
            return False
        return  not Partner.objects.filter(user_id=request.user.id).exists()
