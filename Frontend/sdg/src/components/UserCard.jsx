import React, { useState } from "react";
import axios from "axios";

const UserCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch("http://localhost:8000/api/auth/update-profile/", {
        name: formData.name,
        title: formData.title,
        phone: formData.phone,
        department: formData.department
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("保存成功！");
      setIsEditing(false);
    } catch (err) {
      console.error("保存失败：", err.response?.data || err.message);
      alert("保存失败！");
    }
  };

  return (
    <div className="user-card">
      <div className="avatar-section">
        <div className="avatar"></div>
        <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="user-info">
        <input name="email" value={formData.email} disabled />
        {isEditing ? (
          <>
            <input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Name" />
            <input name="title" value={formData.title || ""} onChange={handleChange} placeholder="Title" />
            <input name="department" value={formData.department || ""} onChange={handleChange} placeholder="Department" />
            <input name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Phone" />
            <button onClick={handleSubmit}>Save</button>
          </>
        ) : (
          <>
            <h2>{formData.name}</h2>
            <p>{formData.title} | {formData.department}</p>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;

