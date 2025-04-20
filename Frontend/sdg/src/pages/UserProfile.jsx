// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import UserCard from '../components/UserCard';
import GroupCard from '../components/GroupCard';
import '../components/Style/UserProfile.css';
import { Link } from 'react-router-dom';



// src/pages/UserProfile.jsx
const UserProfile = () => {

  const [user_test, setUser] = useState(null);
  const [groupMembers_test, setGroupMembers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/auth/profile/');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);
  


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
    { name: "Bob Li", title: "Engineer", dept: "Frontend" },
    { name: "Charlie Wang", title: "Manager", dept: "Product" }
  ];

  return (
    <div className="user-profile-container">
      <div className="profile-main-wrapper">
        <div className="top-banner">
          <Navbar />
        </div>
        <div className="profile-content">
          <UserCard user={user} />
          <GroupCard members={groupMembers} />
        </div>
      </div>
  </div>
  );
};

export default UserProfile;

