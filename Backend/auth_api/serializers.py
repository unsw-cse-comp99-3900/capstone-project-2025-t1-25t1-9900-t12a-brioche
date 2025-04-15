from django.contrib.auth import get_user_model
from rest_framework import serializers

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
