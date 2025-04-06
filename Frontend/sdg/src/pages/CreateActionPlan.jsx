// src/CreateActionPlan.jsx
import React from 'react';
import '../components/CreateActionPlan.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const CreateActionPlan = () => {

  const navigate = useNavigate();

const handleNext = (e) => {
  e.preventDefault();
  navigate('/action/step2'); // ✅ 跳转到 Step 2
};

  return (
    <div className="form-container">
     <nav className="navbar">
        <Link to="/main" className="nav-button">Main Page</Link>
        <Link to="/profile" className="nav-button">User Profile</Link>
        <Link to="/group" className="nav-button">Group Profile</Link>
        <Link to="/action" className="nav-button">Create Action Plan</Link>
        <button className="logout-button">Log out</button>
      </nav>

      <div className="form-box">
        <h2>Create SDG Action Plan</h2>
        <h4>Step 1/7: Basic Information</h4>

        <form className="form-content" onSubmit={handleNext}>
          <label>Analysis ID:</label>
          <input type="text" />

          <label>Designer Name:</label>
          <input type="text" />

          <label>Current Role and Affiliation:</label>
          <input type="text" />

          <label>Impact Project Name:</label>
          <input type="text" />

          <label>Main Challenges Solved:</label>
          <textarea rows="3"></textarea>

          <div className="cap-button-wrapper">
            <button type="submit">Next</button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default CreateActionPlan;
