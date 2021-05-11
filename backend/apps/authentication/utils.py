import datetime 
from datetime import datetime,timedelta
from django.conf import settings
from django.utils import timezone
from rest_framework_jwt.settings import api_settings
 
import uuid
import warnings
from calendar import timegm
from rest_framework_jwt.compat import get_username
from rest_framework_jwt.compat import get_username_field
 


expire_delta = api_settings.JWT_REFRESH_EXPIRATION_DELTA

# custom response of jwt auth done
def jwt_response_payload_handler(token,user=None,request=None):
    return {
        'token':token,
        'user':user.username,
        'email':user.email,
        'profile_pic':request.build_absolute_uri(user.profile.profile_pic.url),
        'token_expires': timezone.now() + expire_delta - timedelta(seconds=200)
    }


#customize token
def jwt_payload_handler(user,request=None):
    username_field = get_username_field()
    username = get_username(user)

    warnings.warn(
        'The following fields will be removed in the future: '
        '`email` and `user_id`. ',
        DeprecationWarning
    )

    payload = {
        'user_id': user.pk,
        'username': username,
        'exp': datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA
    }
    if hasattr(user, 'email'):
        payload['email'] = user.email
    
    if hasattr(user.profile, 'profile_pic'):
        payload['profile_pic'] = request.build_absolute_uri(user.profile.profile_pic.url)

    if isinstance(user.pk, uuid.UUID):
        payload['user_id'] = str(user.pk)

    payload[username_field] = username

    # Include original issued at time for a brand new token,
    # to allow token refresh
    if api_settings.JWT_ALLOW_REFRESH:
        payload['orig_iat'] = timegm(
            datetime.utcnow().utctimetuple()
        )

    if api_settings.JWT_AUDIENCE is not None:
        payload['aud'] = api_settings.JWT_AUDIENCE

    if api_settings.JWT_ISSUER is not None:
        payload['iss'] = api_settings.JWT_ISSUER

    return payload