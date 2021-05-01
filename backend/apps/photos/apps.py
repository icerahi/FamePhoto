from django.apps import AppConfig


class PhotosConfig(AppConfig):
    name = 'apps.photos'

    # def ready(self,request):
    #     from .models import Album
    #     Album.objects.create(user=1,id=1,title='default_album',privacy='public')
