from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import permissions

# from accounts.models import User as Accounts_model
from guide.models import Partner, TourGuide

User = get_user_model()


class IsPartner(permissions.IsAuthenticated):

    def has_permission(self, request, view):
        base_permission = super(IsPartner, self).has_permission(request, view)

        if not base_permission:
            return False
        return Partner.objects.filter(user_id=request.user.id).exists()


class NotTourGuideButPartner(IsPartner):

    def has_permission(self, request, view):
        base_permission = super(NotTourGuideButPartner, self).has_permission(request, view)

        if not base_permission:
            return False

        return not TourGuide.objects.filter(user__user_id=request.user.id).exists()


class IsTourGuide(IsPartner):

    def has_permission(self, request, view):
        base_permission = super(IsTourGuide, self).has_permission(request, view)

        if not base_permission:
            return False

        return TourGuide.objects.filter(user__user_id=request.user.id).exists()

# class NotTourGuideNotPartner(permissions.IsAuthenticated):
#
#     def has_permission(self, request, view):
#         base_permission = super(IsPartner, self).has_permission(request, view)
#
#         if not base_permission:
#             return False
