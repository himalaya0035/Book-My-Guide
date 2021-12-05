from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from rest_framework import serializers

from reviews.models import Review

validate = URLValidator()


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    user_data = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['created_at']

    def get_user_data(self, instance: Meta.model):
        user = instance.user
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
