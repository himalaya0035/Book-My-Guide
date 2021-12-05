from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save

from rapid_api.email_service import sendMail
from rapid_api.whatsapp_service import send_whatsapp

User = get_user_model()


class Appointment(models.Model):
    num_of_people = models.PositiveIntegerField(default=1)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    timing = models.ForeignKey('guide.Timings', on_delete=models.SET_NULL, null=True)
    price = models.PositiveIntegerField()

    guide = models.ForeignKey('guide.TourGuide', on_delete=models.SET_NULL, null=True)


def auto_send_email(sender, instance: Appointment, created, **kwargs):
    if created:
        sendMail("Slot Booked", "Slot Booked", instance.user.email, instance.user.full_name)


def auto_send_whatsapp(sender, instance: Appointment, created, **kwargs):
    if created:
        send_whatsapp(instance.guide.user.user.full_name,
                      instance.timing.start.isoformat() + ' ' + instance.date.isoformat(), instance.guide.place,
                      instance.guide.user.phone_number, "+917618166335")


# post_save.connect(auto_send_email, sender=Appointment)
# post_save.connect(auto_send_whatsapp, sender=Appointment)
