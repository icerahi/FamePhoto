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
        return drf_reverse('photos:detail',kwargs={'id':obj.id})

class AlbumSerializer(serializers.ModelSerializer):
    uri     = serializers.SerializerMethodField(read_only=True)
    user    = UserPublicSerializer(read_only=True)
    photos    = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model   = Album
        fields  =(
            'uri',
            'id',
            'user',
            'name',
            'keep_private',
            'photos',
         )
        read_only_fields = ('user',)

    def get_photos(self,obj):
        photos = obj.photo_set.all()
        return PhotoInlineSerializer(photos,many=True).data

    def get_uri(self,obj):
        request = self.context['request']
        return drf_reverse('albums:detail',kwargs={'id':obj.id},request=request)

    

class AlbumInlineSerializer(AlbumSerializer):
    class Meta:
        model   = Album
        fields  =(
            'uri',
            'id',
            'name',
            'keep_private',
         )
        read_only_fields = ('user',)
