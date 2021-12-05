import django_filters
from rest_framework import generics

from . import serializers
from .models import Review
from .permissions import NotIsPartner


class CreateReviewView(generics.ListCreateAPIView):
    serializer_class = serializers.ReviewSerializer
    queryset = Review.objects.all()
    permission_classes = [NotIsPartner]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['guide']

# def get_queryset(self):
#         return Review.objects.filter(guide_id=)
# # class
