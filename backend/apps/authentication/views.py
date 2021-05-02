from rest_framework.views import APIView
from apps.authentication.permissions import AnonUserPermissionOnly
from rest_framework.response import Response
from django.contrib.auth import authenticate,get_user_model
from django.db.models import Q
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler  = api_settings.JWT_ENCODE_HANDLER 
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER

User = get_user_model()

class AuthAPIView(APIView):
    permission_classes=[AnonUserPermissionOnly,]

    def post(self,*args, **kwargs):
        if self.request.user.is_authenticated:
            return Response({"detail":"You are already authenticated!!"},status=400)

        data = self.request.data
        username = data.get('username')# put username or password
        password = data.get('password')

        user     = authenticate(username=username,password=password)
        qs       = User.objects.get(
            Q(username__iexact=username)|
            Q(email__iexact = username)
        )
        print(qs)
        print(self.request.user)
        if qs:
            user_obj = qs 
            if user_obj.check_password(password):
                user    = user_obj
                payload = jwt_payload_handler(user)
                token   = jwt_encode_handler(payload)
                response= jwt_response_payload_handler(token=token,user=user,request=self.request)
                return Response(response)
        return Response({"detail":"Invalid authentication credentials"},status=401)