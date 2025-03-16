from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractUser):
    email = models.EmailField(unique=True)
    group = models.CharField(max_length=255, blank=True, null=True)
    reset_token = models.CharField(max_length=255, blank=True, null=True)

    groups = models.ManyToManyField(Group, related_name="auth_api_users", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="auth_api_users_permissions", blank=True)
