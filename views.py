from django.contrib.auth import get_user_model, authenticate
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from .serializers import RegisterSerializer, LoginSerializer, GroupSerializer, UserSerializer, ActionPlanSerializer
from .models import Group, ActionPlan

User = get_user_model()

class AuthViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "Auth API is working!"}, status=200)

    @action(detail=False, methods=["post"])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Registration successful",
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=201)
        return Response(serializer.errors, status=400)

    @action(detail=False, methods=["post"])
    def login(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        user = authenticate(username=user.email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=["post"], url_path="google-login", permission_classes=[AllowAny])
    def google_login(self, request):
        token = request.data.get("token")
        if not token:
            return Response({"error": "No token provided"}, status=400)

        try:
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request())
            email = idinfo.get("email")
            if not email:
                return Response({"error": "Invalid token, email not found"}, status=400)

            user, created = User.objects.get_or_create(email=email)
            if created:
                user.set_unusable_password()
                user.save()

            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Google login successful",
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            })

        except Exception as e:
            return Response({"error": f"Token verification failed: {str(e)}"}, status=400)

    @action(detail=False, methods=["patch"], url_path="update-profile", permission_classes=[IsAuthenticated])
    def update_profile(self, request):
        user = request.user
        user.name = request.data.get("name", user.name)
        user.title = request.data.get("title", user.title)
        user.phone = request.data.get("phone", user.phone)
        user.group = request.data.get("department", user.group)
        user.save()
        return Response({"message": "Profile updated successfully."}, status=200)

    @action(detail=False, methods=["get"], url_path="profile", permission_classes=[IsAuthenticated])
    def get_profile(self, request):
        user = request.user
        if not user or user.is_anonymous:
            return Response({"error": "Unauthenticated"}, status=401)

        return Response({
            "email": user.email,
            "name": user.name,
            "title": user.title,
            "phone": user.phone,
            "group": user.group,
        })

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["post"])
    def add_member(self, request, pk=None):
        group = self.get_object()
        email = request.data.get("email")
        username = request.data.get("username")
        try:
            if email:
                user = User.objects.get(email=email)
            elif username:
                user = User.objects.get(username=username)
            else:
                return Response({"error": "Please provide an email or username."}, status=400)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=404)
        group.members.add(user)
        return Response({"message": "Member added successfully."})

    @action(detail=True, methods=["post"])
    def remove_member(self, request, pk=None):
        group = self.get_object()
        user_id = request.data.get("user_id")
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=404)
        group.members.remove(user)
        return Response({"message": "Member removed successfully."})

@api_view(["POST"])
@permission_classes([AllowAny])
def reset_password(request):
    email = request.data.get("email")
    new_password = request.data.get("new_password")

    if not email or not new_password:
        return Response({"error": "Email and new password required."}, status=400)

    try:
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password reset successfully."}, status=200)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)

class ActionPlanViewSet(viewsets.ModelViewSet):
    queryset = ActionPlan.objects.all()
    serializer_class = ActionPlanSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)