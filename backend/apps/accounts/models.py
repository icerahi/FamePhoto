from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

 

class Profile(models.Model):
    user        = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    fullname    = models.CharField(max_length=50,null=True,blank=True)
    bio         = models.TextField(max_length=500,null=True, blank=True)
    location    = models.CharField(max_length=30,null=True, blank=True)
    birth_date  = models.DateField(null=True, blank=True)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
