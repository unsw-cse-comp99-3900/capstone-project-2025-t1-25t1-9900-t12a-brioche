import requests

BASE_URL = "http://localhost:8000/api"

TEST_USER = {
    "email": "testuser@example.com",
    "password": "TestPassword123"
}

def register_user():
    response = requests.post(f"{BASE_URL}/auth/register/", data=TEST_USER)
    if response.status_code == 201:
        print("Registration successful.")
    elif response.status_code == 400:
        print("User already exists or invalid data.")
    else:
        print(f"Registration failed: {response.status_code} {response.text}")

def login_user():
    response = requests.post(f"{BASE_URL}/auth/login/", data=TEST_USER)
    if response.status_code == 200:
        tokens = response.json()
        print("Login successful.")
        return tokens["access"]
    else:
        print(f"Login failed: {response.status_code} {response.text}")
        return None

def get_profile(token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/auth/profile/", headers=headers)
    if response.status_code == 200:
        print("Profile fetched successfully.")
        print(response.json())
    else:
        print(f"Failed to fetch profile: {response.status_code} {response.text}")

def create_action_plan(token):
    headers = {"Authorization": f"Bearer {token}"}
    action_plan_data = {
        "designer_name": "Test Designer",
        "role_and_org": "Developer at TestOrg",
        "plan_name": "Test Action Plan",
        "challenges": "Test challenge description",
        "project_description": "Detailed project description",
        "impact_types": ["Social Impact", "Environmental Impact", "Educational Impact"],
        "sdg_goals": ["SDG 1", "SDG 4", "SDG 13"],
        "importance": "This project is important because...",
        "similar_projects": "Similar projects include...",
        "implementation_steps": ["Step 1", "Step 2", "Step 3"],
        "resources_partners": "Key resources and partners...",
        "required_skills": "Skills required include..."
    }
    response = requests.post(f"{BASE_URL}/action-plans/", json=action_plan_data, headers=headers)
    if response.status_code == 201:
        print("Action Plan created successfully.")
    else:
        print(f"Failed to create Action Plan: {response.status_code} {response.text}")

if __name__ == "__main__":
    register_user()
    token = login_user()
    if token:
        get_profile(token)
        create_action_plan(token)
