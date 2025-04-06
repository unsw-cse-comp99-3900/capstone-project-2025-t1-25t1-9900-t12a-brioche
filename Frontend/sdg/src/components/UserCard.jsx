import React, { useState } from 'react';
import './UserProfile.css';

const UserCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/user/profile/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");

      setIsEditing(false); // 保存成功退出编辑
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="user-card">
      <div className="avatar-section">
        <div className="avatar"></div>
        <button className="edit-button" onClick={handleEditToggle}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <div className="user-info">
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="title" value={formData.title} onChange={handleChange} />
          <input name="department" value={formData.department} onChange={handleChange} />
          <input name="email" value={formData.email} onChange={handleChange} />
          <input name="phone" value={formData.phone} onChange={handleChange} />
          <button onClick={handleSubmit}>Save</button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default UserCard;
