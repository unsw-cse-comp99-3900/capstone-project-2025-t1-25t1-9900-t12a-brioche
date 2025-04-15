import React from 'react';
import GroupCard from '../components/GroupCard';
import Navbar from '../components/Navbar';
import '../components/Style/GroupProfile.css';
import { Link } from 'react-router-dom';

const GroupProfile = () => {

  const groupMembers = [
    { name: "Alice Zhang", title: "Designer", dept: "UX Team" },
    { name: "Bob Li", title: "Engineer", dept: "Frontend" },
    { name: "Charlie Wang", title: "Manager", dept: "Product" }
  ];
  
  return (
    <div className="group-profile-container">
      <Navbar />

      <div className="profile-content">
        
        <GroupCard members={groupMembers} />
        <div className="invite-section">
          <h3>Invite New Members</h3>
          <label>Username</label>
          <input type="text" placeholder="Enter username" />
          <p className="or-separator">OR</p>
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
          <button>Invite</button>
        </div>
      </div>
    </div>
  );
};

export default GroupProfile;
