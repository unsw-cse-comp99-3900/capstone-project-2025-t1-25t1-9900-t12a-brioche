import React, { useState, useEffect } from "react";
import axios from "axios";

const UserCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    title: "",
    department: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        name: user.name || "",
        title: user.title || "",
        department: user.group || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch("http://localhost:8000/api/auth/update-profile/", {
        name: formData.name,
        title: formData.title,
        phone: formData.phone,
        department: formData.department,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Saved successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);
      alert("Failed to save. Please try again.");
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
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your role"
            />
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter your group"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
            />
            <button onClick={handleSubmit}>Save</button>
          </>
        ) : (
          <>
            {formData.name || formData.title || formData.department || formData.phone ? (
              <>
                <h2>{formData.name}</h2>
                <p>{formData.title}</p>
                <p>{formData.department}</p>
                <p>{formData.phone}</p>
              </>
            ) : (
              <p>Please click Edit to complete your profile.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
