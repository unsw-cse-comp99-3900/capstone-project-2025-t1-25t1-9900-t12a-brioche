// src/pages/CreateActionPlanStep2.jsx
import React from 'react';
import '../components/CreateActionPlan2.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CreateActionPlan2 = () => {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    // TODO: Save current step data here
    navigate('/action/step3'); // or next route when ready
  };

  return (
    <div className="cap-form-container">
       <nav className="navbar">
        <Link to="/main" className="nav-button">Main Page</Link>
        <Link to="/profile" className="nav-button">User Profile</Link>
        <Link to="/group" className="nav-button">Group Profile</Link>
        <Link to="/action" className="nav-button">Create Action Plan</Link>
        <button className="logout-button">Log out</button>
      </nav>


      <div className="cap-form-box">
        <h2>Create SDG Action Plan</h2>
        <h4>Step 2/7: Project Description</h4>

        <form className="cap-form-content" onSubmit={handleNext}>
  <label>Analysis ID:</label>
  <input type="text" placeholder="Enter Analysis ID" />

  <label>Detailed description of the impact project:</label>
  <textarea maxLength={200} placeholder="Max 200 words" />

  <label>Select 1 Sustainable Development Goal:</label>
  <select>
    <option value="">-- Select an SDG --</option>
    {[...Array(17)].map((_, i) => (
      <option key={i} value={`Goal ${i + 1}`}>Goal {i + 1}</option>
    ))}
  </select>

  <div className="cap-button-wrapper">
    <button type="submit">Next</button>
  </div>
</form>
      </div>
    </div>
  );
};

export default CreateActionPlan2;
