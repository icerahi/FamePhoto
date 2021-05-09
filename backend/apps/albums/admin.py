from django.contrib import admin
from .models import Album
# Register your models here.
@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['name','keep_private',]
    list_editable = ['keep_private']
