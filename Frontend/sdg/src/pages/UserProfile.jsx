// src/pages/UserProfile.jsx
import React from 'react';
import UserCard from '../components/UserCard';
import GroupCard from '../components/GroupCard';
import '../components/UserProfile.css';

// src/pages/UserProfile.jsx
const UserProfile = () => {

  // Mock user data
  const user = {
    name: "Andrew Wenjun",
    title: "Frontend Developer",
    department: "Tech Team",
    email: "andrew@example.com",
    phone: "123-456-7890",
  };

  // Mock group data
  const groupMembers = [
    { name: "Alice Zhang", title: "Designer", dept: "UX Team" },
    { name: "Bob Li", title: "Engineer", dept: "Frontend" },
    { name: "Charlie Wang", title: "Manager", dept: "Product" }
  ];

  return (
    <div className="user-profile-container">
      <nav className="navbar">
        <button>Main Page</button>
        <button>User Profile</button>
        <button>Group Profile</button>
        <button>Create Action Plan</button>
      </nav>

      <div className="profile-content">
        <UserCard user={user} />
        <GroupCard members={groupMembers} />
      </div>

      <div className="logout-container">
        <button className="logout-button">Log out</button>
      </div>
    </div>
  );
};


export default UserProfile;
