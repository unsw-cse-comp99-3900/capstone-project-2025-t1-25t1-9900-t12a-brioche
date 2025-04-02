// src/pages/UserProfile.jsx
import React from 'react';
import UserCard from '../components/UserCard';
import GroupCard from '../components/GroupCard';
import '../components/UserProfile.css';

const UserProfile = () => {
  return (
    <div className="user-profile-container">
      <nav className="navbar">
        <button>Main Page</button>
        <button>User Profile</button>
        <button>Group Profile</button>
        <button>Create Action Plan</button>
      </nav>

      <div className="profile-content">
        <UserCard />
        <GroupCard />
      </div>

      <div className="logout-container">
        <button className="logout-button">Log out</button>
      </div>
    </div>
  );
};

export default UserProfile;
