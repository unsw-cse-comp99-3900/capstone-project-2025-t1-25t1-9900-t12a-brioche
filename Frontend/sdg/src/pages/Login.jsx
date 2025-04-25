// src/pages/CreateActionPlanStep2.jsx
import React from 'react';
import './CreateActionPlan.css';
import { useNavigate } from 'react-router-dom';

const CreateActionPlanStep2 = () => {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    // TODO: Save current step data here
    navigate('/action/step3'); // or next route when ready
  };

  return (
    <div className="cap-form-container">
      <nav className="cap-navbar">
        <a href="/main" className="cap-nav-button">Main Page</a>
        <a href="/profile" className="cap-nav-button">User Profile</a>
        <a href="/group" className="cap-nav-button">Group Profile</a>
        <a href="/action" className="cap-nav-button">Create Action Plan</a>
      </nav>

      <div className="cap-form-box">
        <h2>Create SDG Action Plan</h2>
        <h4>Step 2/7: Project Description</h4>

        <form className="cap-form-content" onSubmit={handleNext}>
          <label>Analysis ID:</label>
          <input type="text" placeholder="Enter Analysis ID" />

          <label>Detailed description of the impact project:</label>
          <textarea rows="6" maxLength={200} placeholder="Max 200 words" />

          <label>Select 1 Sustainable Development Goal:</label>
          <select>
            <option value="">-- Select an SDG --</option>
            {[...Array(17)].map((_, i) => (
              <option key={i + 1} value={`Goal ${i + 1}`}>Goal {i + 1}</option>
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

export default CreateActionPlanStep2;
