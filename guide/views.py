import datetime
from pprint import pprint

import django_filters
from django.db.models import Q, QuerySet
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from appointments.models import Appointment
from . import serializers
from .filters import CityAndStateNameFilterBackend
from .permissions import IsPartner, NotTourGuideButPartner, IsTourGuide
from . import models as guide_models


class PartnerRegistrationView(generics.CreateAPIView):
    serializer_class = serializers.PartnerRegistrationSerializer
    permission_classes = [IsAuthenticated]


# is partner
# not tour guide
class TourGuideRegistrationView(generics.CreateAPIView):
    serializer_class = serializers.TourGuideRegistrationSerializer
    permission_classes = [NotTourGuideButPartner]


class PackageListView(generics.ListAPIView):
    filter_backends = [CityAndStateNameFilterBackend]
    serializer_class = serializers.PackageListSerializer
    queryset = guide_models.Package.objects.all()


class LocationListView(generics.ListAPIView):
    # filter_backends = [CityAndStateNameFilterBackend]
    serializer_class = serializers.LocationSerializer
    queryset = guide_models.Location.objects.all()

class PlacesListView(APIView):

    def get_object(self):
        query__city_name = self.request.query_params.get('city_name')

        # if query__city_name:
        qs = guide_models.Location.objects.filter(city=query__city_name)
        if qs.exists():
            return qs.first()

    def get_places_queryset(self, location_id):
        return guide_models.Place.objects.filter(location_id=location_id)

    def get(self, *args, **kwargs):
        obj = self.get_object()

        print(obj)
        return Response({**serializers.LocationSerializer(instance=obj).data,
                         'places': serializers.PlaceSerializer(self.get_places_queryset(obj.id), many=True, context={
                             'request': self.request
                         }).data if obj else []})


class PlaceView(generics.RetrieveAPIView):
    queryset = guide_models.Place
    serializer_class = serializers.PlaceSerializer


"""
full name
user city
user place name
fee
rating
user image

"""


class GuidesListView(generics.ListAPIView):
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['place']
    serializer_class = serializers.TourGuideListSerializer
    queryset = guide_models.TourGuide.objects.filter(is_verified=True, package__isnull=False)


class GuideDetailView(generics.RetrieveAPIView):
    serializer_class = serializers.TourGuideSerializer
    queryset = guide_models.TourGuide.objects.filter(is_verified=True, package__isnull=False)


class PackageAvailabilityView(APIView):

    def post(self, *args, **kwargs):
        serializer = serializers.PackageAvailabilitySerializer(data=self.request.data)

        if serializer.is_valid(raise_exception=True):
            date = serializer.data.get('date')
            package_id = serializer.data.get('package_id')
            package = guide_models.Package.objects.get(pk=package_id)
            timings = package.timings.filter(~Q(appointment__date=date))

            return Response(serializers.TimingsSerializer(timings, many=True).data)


class TourGuideDashboard(generics.RetrieveAPIView):
    serializer_class = serializers.DashboardSerializer
    permission_classes = [IsTourGuide]

    def get_object(self):
        return self.request.user.partner.tourguide


class PackageUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsTourGuide]

    def get_serializer(self, *args, **kwargs):
        return serializers.PackageSerializer(remove_fields=['availability', 'timings'], *args, **kwargs)

    def get_object(self):
        user = self.request.user
        queryset = guide_models.Package.objects.get(guide__user__user=user)
        return queryset


class LocationView(generics.RetrieveAPIView):
    serializer_class = serializers.LocationSerializer

    def get_object(self):
        city_name = self.request.query_params.get('city_name')
        state_name = self.request.query_params.get('state_name')
        if city_name and state_name:
            return guide_models.Location.objects.get(city__iexact=city_name, state__iexact=state_name)
        elif city_name:
            return guide_models.Location.objects.get(city__iexact=city_name)
        elif state_name:
            return guide_models.Location.objects.get(state__iexact=state_name)

        # if location is None:
        raise Http404
    # return location


class PackageCreateView(generics.CreateAPIView):
    serializer_class = serializers.PackageCreateSerializer


def search_view(r):
    places = guide_models.Place.objects.all().values('place_name', 'id')
    citys = guide_models.Location.objects.all().values('city', 'id')

    return JsonResponse({'places': list(places), 'citys': list(citys)})
