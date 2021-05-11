import json

from rest_framework import serializers
from apps.albums.models import Album
from apps.accounts.serializers import UserPublicSerializer
from rest_framework.reverse import reverse as drf_reverse
from apps.photos.models import Photo


#for avoid circuler import error we write our PhotoInlineSerialzer here
class PhotoInlineSerializer(serializers.ModelSerializer):
    uri         = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model   = Photo
        fields  =(
            'uri',
            'id',
            'caption',
            'photo',
        )
        read_only_fields= ['user',]

    def get_uri(self,obj):
        request = self.context.get('request')
        return drf_reverse('photos:detail',kwargs={'id':obj.id},request=request)


class AlbumSerializer(serializers.ModelSerializer):
    uri        = serializers.SerializerMethodField(read_only=True)
    user       = UserPublicSerializer(read_only=True)
    photos     = serializers.SerializerMethodField(read_only=True)
    total_photo = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model   = Album
        fields  =(
            'uri',
            'id',
            'user',
            'name',
            'keep_private',
            'photos',
            "total_photo"
         )
        read_only_fields = ('user',)
        
    def get_total_photo(self,obj):
        return obj.photo_set.all().count()


    def get_photos(self,obj):
        request = self.context.get('request')
        photos = obj.photo_set.all()
        return PhotoInlineSerializer(photos,many=True,context=({"request":request})).data

    def get_uri(self,obj):
       request = self.context.get('request')
       return drf_reverse('albums:detail',kwargs={'id':obj.id},request=request)

    
class AlbumInlineSerializer(AlbumSerializer):
    recent_photos = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model   = Album
        fields  =(
            'uri',
            'id',
            'name',
            'keep_private',
            'recent_photos',
            "total_photo"
         )
         
    def get_recent_photos(self,obj):
        request = self.context.get('request')
        recent=obj.photo_set.all()[:3]
        return PhotoInlineSerializer(recent,many=True,context=({"request":request})).data


