// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Style/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/main" className="nav-button">Main Page</Link>
      <Link to="/profile" className="nav-button">User Profile</Link>
      <Link to="/group" className="nav-button">Group Profile</Link>
      <Link to="/action-plan" className="nav-button">Create Action Plan</Link>
      <Link to="/login" className="nav-button logout-button">Log out</Link>
    </nav>
  );
};

export default Navbar;
