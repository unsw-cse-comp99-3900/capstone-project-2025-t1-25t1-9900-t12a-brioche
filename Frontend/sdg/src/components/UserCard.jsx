import React from 'react';
import './UserProfile.css';

const UserCard = () => {
  return (
    <div className="user-card">
      <div className="avatar-section">
        <div className="avatar"></div>
        <button className="edit-button">Edit</button>
      </div>
      <div className="user-info">
        <h2>User Name</h2>
        <p>Job title <span className="divider">|</span> Department</p>
      </div>
      <div className="contact-box">
        <p><strong>Contact information:</strong></p>
        <p>Email address: xxx@xxx.com</p>
        <p>Phone number: 12345667890</p>
      </div>
      <div className="sdg-section">
        <h3>SDG Action Plan</h3>
        <div className="sdg-box"></div>
        <div className="sdg-box"></div>
      </div>
    </div>
  );
};

export default UserCard;