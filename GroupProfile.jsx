import React from 'react';
import GroupCard from '../components/GroupCard';
import '../components/GroupProfile.css';
import { Link } from 'react-router-dom';


const GroupProfile = () => {

  const groupMembers = [
    { name: "Alice Zhang", title: "Designer", dept: "UX Team" },
    { name: "Bob Li", title: "Engineer", dept: "Frontend" },
    { name: "Charlie Wang", title: "Manager", dept: "Product" }
  ];
  
  return (
    <div className="group-profile-container">
      <nav className="navbar">
        <Link to="/main" className="nav-button">Main Page</Link>
        <Link to="/profile" className="nav-button">User Profile</Link>
        <Link to="/group" className="nav-button">Group Profile</Link>
        <Link to="/action" className="nav-button">Create Action Plan</Link>
        <button className="logout-button">Log out</button>
      </nav>

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

      <div className="logout-container">
        <button className="logout-button">Log out</button>
      </div>
    </div>
  );
};

export default GroupProfile;
