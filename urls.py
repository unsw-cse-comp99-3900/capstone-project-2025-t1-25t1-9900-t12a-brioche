from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, GroupViewSet, reset_password, ActionPlanViewSet

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'groups', GroupViewSet, basename='group')
router.register(r'action-plans', ActionPlanViewSet, basename='action-plan')

urlpatterns = [
    path('', include(router.urls)),
    path('reset-password/', reset_password, name='reset-password'),
]