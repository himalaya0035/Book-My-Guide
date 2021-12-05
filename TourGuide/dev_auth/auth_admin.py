from django.contrib.auth import get_user_model
from rest_framework import authentication

User = get_user_model()


class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.filter(email="admin@admin.com")
        user = qs.order_by("?").first()
        return user, None


class NamanAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.filter(email="namanagarwal1470@gmail.com")
        user = qs.order_by("?").first()
        return user, None

