from django.db import models
from django.conf import settings
from apps.albums.models import Album
from django.conf import settings

"""upload photo in a specific directory with specific user"""
def upload_photo(instance,filename):
    return f'photos/{instance.album.user.username}/{instance.album.name}/{filename}'


"""custom models manager for Photo Model"""
class PhotoManager(models.Manager):
    def get_queryset(self):
        return super(PhotoManager,self).get_queryset()
    
    def public(self):
        return super(PhotoManager,self).get_queryset().filter(album__keep_private=False)
    
    def private(self):
        return super(PhotoManager,self).get_queryset().filter(album__keep_private=True)

class Photo(models.Model):
    user        = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    album       = models.ForeignKey(Album,on_delete=models.CASCADE)
    caption     = models.CharField(max_length = 200,blank = True,null = True)
    photo       = models.ImageField(upload_to = upload_photo)

    updated     = models.DateTimeField(auto_now = True)
    created     = models.DateTimeField(auto_now_add = True)

    objects     = PhotoManager()
      
    def __str__(self):
        return f'{self.album}-{self.caption}' or ""

    class Meta:
        ordering=['-updated']

 
 
    
  


