from django.contrib.auth import get_user_model, authenticate
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer, GroupSerializer, UserSerializer
from .models import Group

User = get_user_model()

class AuthViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "Auth API is working!"}, status=200)

    @action(detail=False, methods=["post"])
    def register(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        name = request.data.get("name")   # New
        title = request.data.get("title") # New
        phone = request.data.get("phone") # New

        if not email or not password:
            return Response({"error": "Email and password are required"}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({"error": "User already exists"}, status=400)

        user = User.objects.create_user(email=email, password=password)
        user.name = name
        user.title = title
        user.phone = phone
        user.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Registration successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=201)

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


# New Reset password
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
