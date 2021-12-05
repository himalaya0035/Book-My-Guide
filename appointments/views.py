import datetime

import django_filters
from django.core.exceptions import BadRequest
from django.db import models
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from guide.models import Timings, Package
from guide.serializers import TimingsSerializer
from .models import Appointment
from .serializers import AppointmentCreateSerializer, AppointmentsSerializer, AppointmentDetailSerializer, \
    BookingsListSerializer


class BookAppointmentView(generics.CreateAPIView):
    serializer_class = AppointmentCreateSerializer
    queryset = Appointment
    permission_classes = [IsAuthenticated]

class GuideAvailabilityView(generics.ListAPIView):
    serializer_class = TimingsSerializer

    def get_queryset(self):
        date = self.request.query_params.get('date')
        guide_id = self.kwargs.get('guide_id')
        date = datetime.datetime.strptime(date, "%Y-%m-%d").date()

        curr_date = datetime.date.today()

        if curr_date > date:
            raise BadRequest('previous date')

        # uss date pr wo timings nikaalo jaha p koi bhi appointment na ho
        day_name = date.strftime("%A")

        package_obj = get_object_or_404(Package, guide_id=guide_id)

        if not package_obj.availability.filter(day=day_name).exists():
            return Timings.objects.none()

        query = f"""select
               package.timings_id as id,
               package.start,
               package.end
        from (select timings_id, guide_timings.start, guide_timings.end, guide_package.maximum_person_limit
              from guide_timings
                       join guide_package_timings on guide_timings.id = guide_package_timings.timings_id
                       join guide_package on guide_package_timings.package_id = guide_package.id
              where guide_id = {guide_id}) package
                 left join (select *
                            from appointments_appointment
                            where guide_id = {guide_id}
                              and date = '{date.year}-{date.month}-{date.day}'::date) app
                           on package.timings_id = app.timing_id
        group by package.timings_id, package.start, package.end, package.maximum_person_limit
        having coalesce(sum(app.num_of_people), 0) < package.maximum_person_limit;"""

        return Timings.objects.raw(query)


"""
booking - date, num of ppl timing 
timing (12-1)
"""


class GetAppointmentsView(generics.ListAPIView):
    serializer_class = AppointmentsSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['date']

    def get_queryset(self):
        return Appointment.objects.all().filter(guide__user__user=self.request.user).distinct('timing')


class BookingDetailView(generics.RetrieveAPIView):
    serializer_class = AppointmentDetailSerializer
    queryset = Appointment


class ListBookingsView(generics.ListAPIView):
    serializer_class = BookingsListSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['timing', 'date']

    def get_queryset(self):
        return Appointment.objects.filter(guide__user__user=self.request.user)
