// src/components/GroupCard.jsx
import React from 'react';

const GroupCard = () => {
  return (
    <div className="group-card">
      <h2>Group</h2>
      <h3>Group name</h3>
      <p>Group members:</p>
      <div className="group-members">
        {[1, 2, 3].map((_, i) => (
          <div className="group-member" key={i}>
            <div className="member-avatar"></div>
            <div className="member-info">
              <p>Group member name</p>
              <p>Job title / department</p>
            </div>
          </div>
        ))}
      </div>
      <div className="group-edit-button">
        <button>Edit / create</button>
      </div>
    </div>
  );
};

export default GroupCard;
