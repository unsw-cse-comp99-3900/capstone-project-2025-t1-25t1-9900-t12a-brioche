from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import User

class AuthApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = "/api/auth/register/"
        self.login_url = "/api/auth/login/"
        self.update_url = "/api/auth/update-profile/"
        self.reset_url = "/api/reset-password/"

        self.user_data = {
            "email": "test@example.com",
            "password": "securepass123",
            "name": "Test User",
            "title": "Developer",
            "phone": "1234567890"
        }

    def test_register_user(self):
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email=self.user_data["email"]).exists())

    def test_login_user(self):
        self.client.post(self.register_url, self.user_data, format="json")
        response = self.client.post(self.login_url, {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_update_profile(self):
        self.client.post(self.register_url, self.user_data, format="json")
        login_res = self.client.post(self.login_url, {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }, format="json")
        token = login_res.data["access"]

        # Setting JWT token
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

        update_data = {
            "email": self.user_data["email"],
            "name": "Updated Name",
            "phone": "999888777"
        }
        response = self.client.patch(self.update_url, update_data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.get(email=self.user_data["email"]).name, "Updated Name")

    def test_reset_password(self):
        # Register
        self.client.post(self.register_url, self.user_data, format="json")

        reset_data = {
            "email": self.user_data["email"],
            "new_password": "newpassword456"
        }

        response = self.client.post(self.reset_url, reset_data, format="json")
        self.assertEqual(response.status_code, 200)

        login_response = self.client.post(self.login_url, {
            "email": self.user_data["email"],
            "password": "newpassword456"
        }, format="json")
        self.assertEqual(login_response.status_code, 200)
        self.assertIn("access", login_response.data)
