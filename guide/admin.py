from django.contrib import admin
from . import models as guide_models

admin.site.register(guide_models.TourGuide)
admin.site.register(guide_models.Timings)
admin.site.register(guide_models.Place)
admin.site.register(guide_models.DaysModel)
admin.site.register(guide_models.Location)
admin.site.register(guide_models.Partner)
admin.site.register(guide_models.Package)
