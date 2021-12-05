from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from rest_framework import serializers

from appointments.models import Appointment

User = get_user_model()
validate = URLValidator()


class AppointmentListSerializer(serializers.ModelSerializer):
    package = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = ['id', 'date', 'start_time', 'package']

    def get_package(self, instance: Appointment):
        guide = instance.guide

        img = guide.place.image

        if img is None:
            return {
                'title': guide.package.title
            }
        return {
            'image': img.url,
            'title': guide.package.title
        }


class UserDashboardSerializer(serializers.ModelSerializer):
    bookings = serializers.SerializerMethodField()
    prof_img = serializers.SerializerMethodField()

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
        model = User
        fields = ['prof_img', 'full_name', 'prof_img', 'email', 'bookings']

    def get_prof_img(self, user):
        img_obj = user.prof_img

        if img_obj is None:
            return None
        if img_obj:
            try:
                path = validate(img_obj.url)
            except ValidationError as _:
                path = img_obj.name
            return path
        return None

    def get_bookings(self, instance):
        qs = Appointment.objects.filter(user=instance)
        return AppointmentListSerializer(qs, many=True).data
