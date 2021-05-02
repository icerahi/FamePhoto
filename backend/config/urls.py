from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/photos/',include(('apps.photos.urls','photos'),namespace='photos')),
    path('api/accounts/',include(('apps.accounts.urls','accounts'),namespace='accounts')),
    path('api/albums/',include(('apps.albums.urls','albums'),namespace='albums')),
    path('api/auth/',include(('apps.authentication.urls','authentication'),namespace='auth')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += [
        re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
    ]

if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
    ]