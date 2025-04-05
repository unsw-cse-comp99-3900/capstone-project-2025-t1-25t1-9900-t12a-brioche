import React from 'react';
import './UserProfile.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="avatar-section">
        <div className="avatar"></div>
        <button className="edit-button">Edit</button>
      </div>
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>{user.title} <span className="divider">|</span> {user.department}</p>
      </div>
      <div className="contact-box">
        <p><strong>Contact information:</strong></p>
        <p>Email address: {user.email}</p>
        <p>Phone number: {user.phone}</p>
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
