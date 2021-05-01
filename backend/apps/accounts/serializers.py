from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.accounts.models import Profile
 
User = get_user_model()

class UserPublicSerializer(serializers.ModelSerializer):
    uri     = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User 
        fields = (
            'uri',
            'id',
            'username',
        )

    def get_uri(self,obj):
        return f'/{obj.username}'

    


class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = (
            'user',
            'fullname',
            'bio',
            'location',
            'birth_date',
        )
        read_only_fields = ['user',]

     


class UserProfileSerializer(serializers.ModelSerializer):
    uri = serializers.SerializerMethodField(read_only=True)
    profile = ProfileSerializer()
    albums  = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = (
            'uri',
            'id',
            'username',
            'email',
            'profile',
            'albums',
        )
    # def to_representation(self,instance):
    #     response = super().to_representation(instance)
    #     response['profile'] = ProfileSerializer(instance).data
    #     return response  
    def get_albums(self,obj):
        request = self.context.get('request')
        public = obj.album_set.filter(keep_private=False)
        data = {
            'public':"http://public.com"
        }
        if request.user==obj:
            data['private']= "http://private.com"

        return data

    def get_uri(self,obj):
        return f'/{obj.username}/'
    
    def update(self,instance,validated_data):
        profile_data= ProfileSerializer(instance.profile,data=validated_data.get('profile'))
        profile_data.is_valid()
        profile_data.save()
        instance.username = validated_data.get('username',instance.username)
        instance.email    = validated_data.get('email',instance.email)
        instance.save()
        return instance 


    
