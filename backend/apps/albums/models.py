from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver


"""custom model manager for Album Model"""
class AlbumManager(models.Manager):
    def get_queryset(self):
        return super(AlbumManager,self).get_queryset()

    def public(self):
        return super(AlbumManager,self).get_queryset().filter(keep_private=False)

    def private(self):
        return super(AlbumManager,self).get_queryset().filter(keep_private=True)


class Album(models.Model):
    user         = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    name         = models.CharField(max_length=200)
    keep_private = models.BooleanField(default=False)

    updated      = models.DateTimeField(auto_now=True)
    created      = models.DateTimeField(auto_now_add=True)

    objects      = AlbumManager()

    def __str__(self):
        return f"{self.user.username}/{self.name}" or ""
 
 
 
""" genarating a defualt album for a created user"""
@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def auto_create_default_album(sender,instance,created,**kwargs):
    if created:
        Album.objects.get_or_create(id=instance.id,user=instance,name=f"Quick Save",)

