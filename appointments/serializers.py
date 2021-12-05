import datetime
import time

from django.db import transaction, models
from rest_framework import serializers

from accounts.seializers import UserDashboardSerializer
from appointments.models import Appointment
from guide.models import TourGuide, Package, Timings
from guide.serializers import TimingsSerializer, TourGuideSerializer


class AppointmentCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Appointment
        fields = ['guide', 'date', 'timing', 'user', 'num_of_people']

    def validate(self, attrs):
        start = time.time()

        curr_date = datetime.date.today()
        booking_date = attrs.get('date')
        num_of_people = attrs.get('num_of_people')
        timing_obj: Timings = attrs.get('timing')
        if booking_date < curr_date:
            raise serializers.ValidationError('Cant Book appointment before current date')

        guide: TourGuide = attrs.get('guide')
        package = guide.package
        day_name = booking_date.strftime("%A")

        if not package.availability.filter(day=day_name).exists():
            raise serializers.ValidationError('No package available for this day')
        # check if there's a pac
        if not package.timings.filter(id=timing_obj.id):
            raise serializers.ValidationError('No package available for this timing')

        appointment_count_for_slot = Appointment.objects.filter(
            guide__package=package, timing=timing_obj, date=booking_date). \
            aggregate(models.Sum('num_of_people'))['num_of_people__sum']

        if appointment_count_for_slot is None:
            appointment_count_for_slot = 0

        if appointment_count_for_slot + num_of_people > package.maximum_person_limit:
            raise serializers.ValidationError('Slot booked')
        price = package.fee * num_of_people
        attrs['price'] = price + price*0.1
        attrs['start_time'] = timing_obj.start
        attrs['end_time'] = timing_obj.end
        end = time.time()

        print("Validate -> ", end-start)
        return attrs

    def create(self, validated_data):
        start = time.time()
        x =  super(AppointmentCreateSerializer, self).create(validated_data)
        end = time.time()
        print("create -> ", end - start)
        return x
class AppointmentsSerializer(serializers.ModelSerializer):
    timing = TimingsSerializer()

    class Meta:
        model = Appointment
        fields = ['timing']


class AppointmentDetailSerializer(serializers.ModelSerializer):
    guide = TourGuideSerializer(remove_fields=['description', 'fee'])

    class Meta:
        model = Appointment
        fields = ['id', 'price', 'date', 'start_time', 'num_of_people', 'guide']


class BookingsListSerializer(serializers.ModelSerializer):
    # user_data = serializers.SerializerMethodField()
    user = UserDashboardSerializer(remove_fields=['bookings'])

    class Meta:
        model = Appointment
        fields = ['id', 'price', 'num_of_people', 'user']
