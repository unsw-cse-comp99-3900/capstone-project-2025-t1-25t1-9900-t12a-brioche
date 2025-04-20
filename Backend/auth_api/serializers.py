from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Group

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    greeting = serializers.SerializerMethodField()  

    class Meta:
        model = User
        fields = ["email", "password", "greeting"]  
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def get_greeting(self, obj):
        return f"Welcome, your email is {obj.email}! - from Yueyao"  

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'custom_groups']

class GroupSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'created_at', 'members']

    def create(self, validated_data):
        members = validated_data.pop('members', [])
        group = Group.objects.create(**validated_data)
        group.members.set(members)
        return group

    def update(self, instance, validated_data):
        members = validated_data.pop('members', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if members is not None:
            instance.members.set(members)
        instance.save()
        return instance
