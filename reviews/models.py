from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Avg
from django.db.models.signals import post_save

User = get_user_model()


class Tag(models.Model):
    tag_name = models.CharField(max_length=20, primary_key=True)

    def __str__(self):
        return self.tag_name


class Review(models.Model):
    content = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    guide = models.ForeignKey('guide.TourGuide', on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag')
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']


def auto_update_rating(sender, instance: Review, created, **kwargs):
    if created:
        guide_obj = instance.guide
        avg_rating = Review.objects.filter(guide=instance.guide).aggregate(avg_rating=Avg('rating'))

        if avg_rating is not None:
            guide_obj.rating = avg_rating['avg_rating']
            guide_obj.save()


# post_save.connect(auto_update_rating, sender=Review)
