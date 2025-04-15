from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, GroupViewSet

router = DefaultRouter()
router.register(r"auth", AuthViewSet, basename="auth")
router.register(r"groups", GroupViewSet, basename="group")

urlpatterns = [
    path("", include(router.urls)),
]
