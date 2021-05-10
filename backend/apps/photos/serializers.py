from rest_framework import serializers
from apps.photos.models import Photo
from apps.albums.serializers import AlbumInlineSerializer
from apps.accounts.serializers import UserPublicSerializer
from rest_framework.reverse import reverse as drf_reverse
from apps.albums.models import Album
from next_prev import next_in_order,prev_in_order

class PhotoSerializer(serializers.ModelSerializer):
    uri         = serializers.SerializerMethodField(read_only=True)
    user        = UserPublicSerializer(read_only=True)
    next_id     = serializers.SerializerMethodField(read_only=True)
    prev_id     = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model   = Photo 
        fields  =(
            'uri',
            'id',
            'user',
            'album',
            'caption',
            'photo',
            'next_id',
            'prev_id',
        )
        read_only_fields= ['user',]

    def get_next_id(self,obj):
        _next = next_in_order(obj)
        if _next is not None:
            return  _next.id 
         
    def get_prev_id(self,obj):
        _prev = prev_in_order(obj)
        if _prev is not None:
            return _prev.id
         
 
    def to_representation(self,instance):
        request = self.context.get('request')
        response = super().to_representation(instance)
        response['album'] = AlbumInlineSerializer(instance.album,context={'request':request}).data
        return response         
    
    def get_uri(self,obj):
        request = self.context.get('request')
        return drf_reverse('photos:detail',kwargs={'id':obj.id},request=request)

