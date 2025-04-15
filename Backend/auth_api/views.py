from django.contrib.auth import get_user_model, authenticate
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer

import logging

logger = logging.getLogger(__name__)
User = get_user_model()


class AuthViewSet(viewsets.ViewSet):

    def list(self, request):
        return Response({"message": "Auth API is working!"}, status=200)

    @action(detail=False, methods=["post"])
    def register(self, request):
        logger.info("Yueyao reached the register API")

        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "User with this email already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(email=email, password=password)
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Registration successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"])
    def login(self, request):
        logger.info("Yueyao reached the login API")

        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = authenticate(username=user.email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_200_OK)

        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )
