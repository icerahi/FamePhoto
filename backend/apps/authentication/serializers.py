from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_jwt.settings import api_settings
from django.utils import timezone
import datetime

jwt_payload_handler            = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler             = api_settings.JWT_ENCODE_HANDLER
jwt_response_payload_handler   = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER
expire_delta                   = api_settings.JWT_REFRESH_EXPIRATION_DELTA

User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    password     = serializers.CharField(write_only=True,style={'input_type':'password'})
    password2    = serializers.CharField(write_only=True,style={'input_type':'password'})
    email        = serializers.EmailField(required=True)
    message      = serializers.SerializerMethodField(read_only=True)
    token        = serializers.SerializerMethodField(read_only=True)
    token_expires= serializers.SerializerMethodField(read_only=True)
    class Meta:
        model   = User
        fields  = (
            'username',
            'email',
            'password',
            'password2',
            'message',
            'token',
            'token_expires',

        )
        extra_kwargs = {'password':{'write_only':True}}

    def get_message(self,obj):
        return f"Hi {obj.username}! Thanks for Joining,Please Complete Your Profile."

    def get_token_expires(self,obj):
        return timezone.now() + expire_delta - datetime.timedelta(seconds=200)

    def get_token(self,obj):
        user     = obj 
        payload  = jwt_payload_handler(user)
        token    = jwt_encode_handler(payload)
        return token 

    
    def validate_email(self,value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("User with this email already registered!!")
        return value 
    
    def validate_username(self,value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("User with this username already exists.Try another!!")
        return value 

    def validate(self,data):
        pw  = data.get('password')
        pw2 = data.pop('password2')
        if pw != pw2:
            raise serializers.ValidationError('Password must be match!!')
        return data

    def create(self,validated_data):
        username = validated_data.get('username')
        email    = validated_data.get('email')
        password = validated_data.get('password')
        user_obj = User(username=username,email=email)
        user_obj.set_password(password)
        user_obj.save()
        return user_obj
