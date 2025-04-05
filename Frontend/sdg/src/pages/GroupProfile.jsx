import React from 'react';
import GroupCard from '../components/GroupCard';
import '../components/GroupProfile.css';
import { Link } from 'react-router-dom'; // ✅ 加入跳转功能


const GroupProfile = () => {
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
        {/* 左边：复用 GroupCard 组件 */}
        <GroupCard />

        {/* 右边：你新增的邀请新成员表单 */}
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
