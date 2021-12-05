import datetime
from typing import OrderedDict, List

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from django.db import transaction
from django.db.models import Q, Sum
from django.http import Http404
from rest_framework import serializers

from appointments.models import Appointment
from . import models as guide_models
from .serializer_utils import CurrentUsersPartnerDefault, CurrentPartnersTourGuideDefault

validate = URLValidator()

User = get_user_model()


class LocationSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):

        """
        :param kwargs: set remove_fields to dynamically remove default fields of serializer
        """

        remove_fields = kwargs.pop('remove_fields', None)

        super().__init__(*args, **kwargs)

        if remove_fields:
            for remove_field in remove_fields:
                self.fields.pop(remove_field)

    class Meta:
        model = guide_models.Location
        fields = '__all__'


class TimingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = guide_models.Timings
        fields = '__all__'
        # exclude = ['id']


class PackageSerializer(serializers.ModelSerializer):
    timings = serializers.SerializerMethodField()

    def __init__(self, *args, **kwargs):

        """
        :param kwargs: set remove_fields to dynamically remove default fields of serializer
        """

        remove_fields = kwargs.pop('remove_fields', None)

        super().__init__(*args, **kwargs)

        if remove_fields:
            for remove_field in remove_fields:
                self.fields.pop(remove_field)

    class Meta:
        model = guide_models.Package
        fields = '__all__'
        read_only_fields = ['guide']

    def get_timings(self, instance: Meta.model):

        timings = instance.timings.all()

        # available_slots = Timings.objects.filter(package__tourguide__appointment__start_time=1)
        # ts = []
        # print(timings)
        # for timing in timings:
        #     print(Appointment.objects.filter(start_time=timing.start, end_time=timing.end,
        #                                      guide__package=instance).exists())
        #     # if Appointment.objects.filter(~Q(start_time=timing.start), ~Q(end_time=timing.end), guide__package=instance).exists():
        #     if not Appointment.objects.filter(start_time=timing.start, end_time=timing.end,
        #                                       guide__package=instance).exists():
        #         ts.append(timing)

        today = datetime.date.today()
        available_slots = timings.filter(~Q(appointment__date=today))
        # print(ts)
        return TimingsSerializer(available_slots, many=True).data


"""

check in appointments that for a package id does this exists 

"""


class TourGuideRegistrationSerializer(serializers.ModelSerializer):
    is_verified = serializers.BooleanField(read_only=True)
    user = serializers.HiddenField(default=CurrentUsersPartnerDefault())
    place_name = serializers.CharField(max_length=50, write_only=True)

    class Meta:
        model = guide_models.TourGuide
        fields = '__all__'
        read_only_fields = ['rating', 'place']

    @transaction.atomic
    def create(self, validated_data):
        place_name: str = validated_data.pop('place_name')
        user = self.context.get('request').user
        partner_obj: guide_models.Partner = user.partner

        place_name_splitted = place_name.split(" ")
        place_name = " ".join([i.capitalize() for i in place_name_splitted])

        place_obj, _ = guide_models.Place.objects.get_or_create(place_name=place_name, location=partner_obj.location,
                                                                open_time=datetime.time(hour=6),
                                                                close_time=datetime.time(hour=18))

        return guide_models.TourGuide.objects.create(**validated_data, place=place_obj)


class PartnerRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    location__city = serializers.CharField(max_length=50, write_only=True)
    location__state = serializers.CharField(max_length=50, write_only=True)

    class Meta:
        model = guide_models.Partner
        exclude = ['is_verified']

    @transaction.atomic
    def create(self, validated_data):
        location_data_city = validated_data.pop('location__city')
        location_data_state = validated_data.pop('location__state')
        location_obj, _ = guide_models.Location.objects.get_or_create(city=location_data_city,
                                                                      state=location_data_state)
        print("location created")
        partner_obj = self.Meta.model.objects.create(**validated_data)
        partner_obj.location = location_obj
        partner_obj.save()
        return partner_obj


class PlaceSerializer(serializers.ModelSerializer):
    location = LocationSerializer(remove_fields=['id', 'description'])

    def __init__(self, *args, **kwargs):

        """
        :param kwargs: set remove_fields to dynamically remove default fields of serializer
        """

        remove_fields = kwargs.pop('remove_fields', None)

        super().__init__(*args, **kwargs)

        if remove_fields:
            for remove_field in remove_fields:
                self.fields.pop(remove_field)

    class Meta:
        model = guide_models.Place
        fields = '__all__'


class TourGuideListSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    place = PlaceSerializer(remove_fields=['id', 'image', 'description', 'rating', 'close_time', 'open_time'])
    fee = serializers.SerializerMethodField()

    class Meta:
        model = guide_models.TourGuide
        fields = ['id', 'user', 'rating', 'place', 'fee']

    def get_fee(self, instance):
        return instance.package.fee

    def get_user(self, instance: Meta.model):
        user = instance.user.user
        img_obj = user.prof_img

        if img_obj is None:
            return {
                'name': user.full_name
            }
        if img_obj:
            try:
                path = validate(img_obj.url)
            except ValidationError as _:
                path = img_obj.name
            return {
                'image': path,
                'name': user.full_name
            }
        return {
            'name': user.full_name,
            'image': None
        }


class TourGuideSerializer(TourGuideListSerializer):
    description = serializers.SerializerMethodField()
    phone_number = serializers.SerializerMethodField()

    featured_review = serializers.SerializerMethodField(read_only=True)

    def __init__(self, *args, **kwargs):

        """
        :param kwargs: set remove_fields to dynamically remove default fields of serializer
        """

        remove_fields = kwargs.pop('remove_fields', None)

        super().__init__(*args, **kwargs)

        if remove_fields:
            for remove_field in remove_fields:
                self.fields.pop(remove_field)

    class Meta:
        model = TourGuideListSerializer.Meta.model
        fields = TourGuideListSerializer.Meta.fields + ['description', 'phone_number', 'featured_review']

    def get_description(self, ins: Meta.model):
        return ins.package.description

    def get_phone_number(sel, ins: Meta.model):

        return ins.user.phone_number

    def get_featured_review(self, instance: Meta.model):
        qs = instance.review_set.all().order_by("?")
        if qs.exists():
            return qs[0].content
        return ""


class PackageAvailabilitySerializer(serializers.Serializer):
    package_id = serializers.IntegerField()
    date = serializers.DateField()

    # package =

    def validate_package_id(self, *args, **kwargs):
        obj = guide_models.Package.objects.filter(pk=args[0])
        if not obj.exists():
            raise Http404
        # self.data
        return args[0]

    def validate_date(self, *args, **kwargs):
        today = datetime.date.today()
        date = args[0]
        if date < today:
            raise ValidationError("Previous Date")
        return date


class DashboardSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    appointments_data = serializers.SerializerMethodField()
    contact_num = serializers.SerializerMethodField()
    place = PlaceSerializer(remove_fields=['id', 'image', 'description', 'rating', 'close_time', 'open_time'])

    package = serializers.SerializerMethodField()

    class Meta:
        model = guide_models.TourGuide
        fields = ['id', 'user', 'rating', 'appointments_data', 'contact_num', 'place', 'package', 'is_verified']

    def get_contact_num(self, ins: Meta.model):
        return ins.user.phone_number

    def get_user(self, instance: Meta.model):
        user = instance.user.user

        img_obj = user.prof_img

        if not img_obj:
            return {
                'name': user.full_name
            }
        try:
            path = validate(img_obj.url)
        except ValidationError as _:
            path = img_obj.name
        return {
            'image': path,
            'name': user.full_name
        }

    def get_package(self, ins: Meta.model):
        return {
            'title': ins.package.title,
            'description': ins.package.description
        }

    def get_appointments_data(self, instance: Meta.model):
        appointments = Appointment.objects.filter(guide=instance)
        count = appointments.count()
        money_earned = appointments.aggregate(Sum('price'))
        # TODO total money earned
        return {
            "count": count,
            "money_earned": money_earned['price__sum']
        }


class PackageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = guide_models.Package
        fields = '__all__'


class PackageCreateSerializer(serializers.ModelSerializer):
    guide = serializers.HiddenField(default=CurrentPartnersTourGuideDefault())
    timings = serializers.ListSerializer(child=TimingsSerializer(), write_only=True)

    class Meta:
        model = guide_models.Package
        fields = '__all__'

    @transaction.atomic
    def create(self, validated_data):
        timings = validated_data.pop('timings')
        availability = validated_data.pop('availability')

        package_obj = guide_models.Package.objects.create(**validated_data)
        for timing in timings:
            timings_obj, _ = guide_models.Timings.objects.get_or_create(**timing)
            package_obj.timings.add(timings_obj)
        package_obj.save()
        for i in availability:
            package_obj.availability.add(i)
        package_obj.save()

        return package_obj

# class PackageUpdate
