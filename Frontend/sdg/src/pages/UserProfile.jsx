// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import UserCard from '../components/UserCard';
import GroupCard from '../components/GroupCard';
import '../components/Style/UserProfile.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [user_test, setUser] = useState(null);

  const groupMembers = [
    { name: "Bob Li", title: "Engineer", dept: "Frontend" },
    { name: "Charlie Wang", title: "Manager", dept: "Product" }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get('/api/auth/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-profile-container">
      <div className="profile-main-wrapper">
        <div className="top-banner">
          <Navbar />
        </div>
        <div className="profile-content">
          <UserCard user={user_test} />
          <GroupCard members={groupMembers} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;