from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save

from guide.storage_paths import get_adhaar_upload_path, get_pancard_upload_path, get_place_image_path, \
    get_acc_verif_upload_path
from rapid_api.email_service import sendMail

User = get_user_model()


class DaysModel(models.Model):
    DAYS_OF_WEEK = (
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    )

    day = models.CharField(max_length=9, choices=DAYS_OF_WEEK, primary_key=True)

    class Meta:
        verbose_name_plural = 'Days '

    def __str__(self):
        return self.day


class Timings(models.Model):
    start = models.TimeField()
    end = models.TimeField()

    def __str__(self):
        return f"{self.start} - {self.end}"


class Location(models.Model):
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)

    description = models.TextField(default="")


class Place(models.Model):
    place_name = models.CharField(max_length=100)  # tajmahal
    location = models.ForeignKey('Location', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_place_image_path, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    open_time = models.TimeField()
    close_time = models.TimeField()

    class Meta:
        ordering = ['-rating']

    def __str__(self):
        return self.place_name

# TODO make details unique

class Partner(models.Model):
    adhaar_num = models.CharField(max_length=12)
    adhaar_img = models.ImageField(upload_to=get_adhaar_upload_path)

    pancard_num = models.CharField(max_length=10)
    pancard_img = models.ImageField(upload_to=get_pancard_upload_path)

    bank_details_IFSC = models.CharField(max_length=15)
    bank_details_Account_name = models.CharField(max_length=20)
    back_details_Account_number = models.CharField(max_length=20)
    bank_account_verification_image = models.ImageField(upload_to=get_acc_verif_upload_path)

    is_verified = models.BooleanField(default=False)

    location = models.ForeignKey('Location', on_delete=models.SET_NULL, null=True)
    phone_number = models.CharField(max_length=12)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.full_name


class Package(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    availability = models.ManyToManyField('DaysModel')
    timings = models.ManyToManyField('Timings')
    maximum_person_limit = models.PositiveIntegerField()
    fee = models.PositiveIntegerField()

    guide = models.OneToOneField('TourGuide', on_delete=models.CASCADE)
"""

tajmahal 

guide -> group (12) 100/person

slot -> 1-2 person limit 12 
    |-> 4+ 4 +3 +1
    |-> 12 or < 12

"""


class TourGuide(models.Model):
    user = models.OneToOneField('Partner', on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)

    license_number = models.CharField(max_length=100)
    license = models.ImageField(null=True, blank=False)
    place = models.ForeignKey('Place', on_delete=models.SET_NULL, null=True)

    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)

    def __str__(self):
        return self.user.user.full_name


def send_partner_creation_email(sender, instance: Partner, created, **kwargs):
    if created:
        sendMail("Partner Registration form successfully filled", "Partner Registration Form", instance.user.email,
                 instance.user.full_name)

    if instance.is_verified:
        sender("Partner Registration form verified", "Partner Guide Registration", instance.user.email,
               instance.user.full_name)


def send_tour_guide_creation_email(sender, instance: TourGuide, created, **kwargs):
    if created:
        sendMail("TourGuide Registration form successfully filled", "Tour Guide Registration Form",
                 instance.user.user.email,
                 instance.user.user.full_name)

    else:
        if instance.is_verified:
            sender("Tour Guide Registration form verified", "Tour Guide Registration", instance.user.user.email,
                   instance.user.user.full_name)


# post_save.connect(send_partner_creation_email, sender=Partner)
# post_save.connect(send_tour_guide_creation_email, sender=TourGuide)
