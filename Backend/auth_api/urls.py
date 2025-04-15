"""
URL configuration for djangoProject project.

This file routes top-level URLs to app-specific URLs.
For more information, see:
https://docs.djangoproject.com/en/5.1/topics/http/urls/

Edited by Yueyao on April 15, 2025
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Admin panel (not actively used yet)
    path('admin/', admin.site.urls),

    # Auth-related API endpoints - registered by Yueyao
    path('api/', include('auth_api.urls')),
]

