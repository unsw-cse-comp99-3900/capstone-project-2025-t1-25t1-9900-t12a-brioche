import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import GroupCard from '../components/GroupCard';
import '../components/UserProfile.css';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/profile/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser({
          ...data,
          department: data.group
        });
      } catch (err) {
        console.error("获取用户信息失败：", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/Main"); // 假设你有登录页
  };

  const groupMembers = [
    { name: "Alice Zhang", title: "Designer", dept: "UX Team" },
    { name: "Bob Li", title: "Engineer", dept: "Frontend" },
    { name: "Charlie Wang", title: "Manager", dept: "Product" }
  ];

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile-container">
      <nav className="navbar">
        <Link to="/main" className="nav-button">Main Page</Link>
        <Link to="/profile" className="nav-button">User Profile</Link>
        <Link to="/group" className="nav-button">Group Profile</Link>
        <Link to="/action" className="nav-button">Create Action Plan</Link>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <div className="profile-content">
        <UserCard user={user} />
        <GroupCard members={groupMembers} />
      </div>
    </div>
  );
};

export default UserProfile;