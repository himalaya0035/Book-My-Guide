from django.http import HttpResponseRedirect
from rest_framework import status
from rest_framework.response import Response


class AnonymousRequired(object):
    def __init__(self, view_function):
        self.view_function = view_function

    def __call__(self, request, *args, **kwargs):
        if request.user is not None and request.user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)
        return self.view_function(request, *args, **kwargs)
