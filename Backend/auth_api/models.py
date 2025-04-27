from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.conf import settings

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, username=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True, blank=True, null=True)
    group = models.CharField(max_length=255, blank=True, null=True)

    # Extended fields
    name = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    objects = UserManager()

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email
        super().save(*args, **kwargs)

class Group(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField('User', related_name='custom_groups')

    def __str__(self):
        return self.name

# ActionPlan model for SDG survey
class ActionPlan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Step 1
    designer_name = models.CharField(max_length=255)
    role_and_org = models.CharField(max_length=255)
    plan_name = models.CharField(max_length=255)

    # Step 2
    challenges = models.TextField(max_length=300)
    project_description = models.TextField(max_length=1000)

    # Step 3
    impact_types = models.JSONField(default=list)
    sdg_goals = models.JSONField(default=list)

    # Step 4
    importance = models.TextField(max_length=1000)
    similar_projects = models.TextField(max_length=1000)

    # Step 5
    implementation_steps = models.JSONField(default=list)

    # Step 6
    resources_partners = models.TextField(max_length=1000)
    required_skills = models.TextField(max_length=1000)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.plan_name
