// src/pages/UserProfile.jsx
import React from 'react';
import UserCard from '../components/UserCard';
import GroupCard from '../components/GroupCard';
import '../components/UserProfile.css';
import { Link } from 'react-router-dom'; // ✅ 加入跳转功能


const UserProfile = () => {
  return (
    <div className="user-profile-container">
      <nav className="navbar">
        <Link to="/main" className="nav-button">Main Page</Link>
        <Link to="/profile" className="nav-button">User Profile</Link>
        <Link to="/group" className="nav-button">Group Profile</Link>
        <Link to="/action" className="nav-button">Create Action Plan</Link>
        <button className="logout-button">Log out</button>
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
