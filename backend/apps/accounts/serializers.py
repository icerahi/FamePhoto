from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.accounts.models import Profile
from rest_framework.reverse import reverse as drf_reverse


User = get_user_model()

class UserPublicSerializer(serializers.ModelSerializer):
    uri         = serializers.SerializerMethodField(read_only=True)
    profile_pic = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User 
        fields = (
            'uri',
            'id',
            'username',
            'profile_pic',
        )

    def get_profile_pic(self,obj):
        return self.context['request'].build_absolute_uri(obj.profile.profile_pic.url)

    def get_uri(self,obj):
        request = self.context.get('request')
        return drf_reverse('accounts:profile',kwargs={'username':obj.username},request=request)

    


class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = (
            'user',
            'fullname',
            'bio',
            'location',
            'birth_date',
            'profile_pic',
        )
        read_only_fields = ['user',]

     


class UserProfileSerializer(serializers.ModelSerializer):
    uri         = serializers.SerializerMethodField(read_only=True)
    profile     = ProfileSerializer()
    albums      = serializers.SerializerMethodField(read_only=True)
    photos      = serializers.SerializerMethodField(read_only=True)
    total_photo = serializers.SerializerMethodField(read_only=True)
    total_album = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = (
            'uri',
            'id',
            'username',
            'email',
            'profile',
            'albums',
            'photos',
            'total_photo',
            'total_album',
        )
    def get_total_photo(self,obj):
        return obj.photo_set.all().count()

    def get_total_album(self,obj):
        return obj.album_set.all().count()

    def get_photos(self,obj):
        request = self.context.get('request')
        data = {
            'public':drf_reverse('accounts:public_photos',kwargs={'username':obj.username},request=request)
        }
        if request.user==obj:
            data['private']= drf_reverse('accounts:private_photos',kwargs={'username':obj.username},request=request)
        return data

    def get_albums(self,obj):
        request = self.context.get('request')
        public = obj.album_set.filter(keep_private=False)
        data = {
            'public':drf_reverse('accounts:public_albums',kwargs={'username':obj.username},request=request)
        }
        if request.user==obj:
            data['private']= drf_reverse('accounts:private_albums',kwargs={'username':obj.username},request=request)
            data['all_albums']= drf_reverse('accounts:all_albums',kwargs={'username':obj.username},request=request)
        return data

    def get_uri(self,obj):
        request = self.context.get('request')
        return drf_reverse('accounts:profile',kwargs={'username':obj.username},request=request)
    
    def update(self,instance,validated_data):
        profile_data= ProfileSerializer(instance.profile,data=validated_data.get('profile'))
        profile_data.is_valid()
        profile_data.save()
        instance.username = validated_data.get('username',instance.username)
        instance.email    = validated_data.get('email',instance.email)
        instance.save()
        return instance 


    
