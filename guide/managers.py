from django.db import models


class TourGuideManager(models.Manager):
    def get_active(self):
        return self.filter(models.Q(package__isnull=False) & models.Q(is_verified=True))


class PackageManager(models.Manager):
    def get_by_location_string(self, city_name: str, state_name: str, case_sensitive=True):
        if case_sensitive:
            return self.filter(models.Q(place__location__city=city_name) & models.Q(place__location__city=state_name))
        return self.filter(models.Q(place__location__city__iexact=city_name) & models.Q(place__location__city__iexact=state_name))

    def get_by_location(self, location_id):
        return self.filter(location_id=location_id)

    def get_by_place_name(self, place_name: str, case_sensitive=True):
        if case_sensitive:
            return self.filter(place__place_name=place_name)
        return self.filter(place__place_name__iexact=place_name)
