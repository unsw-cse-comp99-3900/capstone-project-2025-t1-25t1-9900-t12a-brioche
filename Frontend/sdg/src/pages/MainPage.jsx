import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/MainPage.css';

const sdgGoals = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  url: `https://sdgs.un.org/goals/goal${i + 1}`,
}));

const MainPage = () => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    if (!keyword.trim()) return;
    const searchUrl = `https://sdg.unswzoo.com/search/?mode=contains&keyword=${encodeURIComponent(keyword)}`;
    window.open(searchUrl, '_blank'); 
  };

  return (
    <div className="main-page-container">
      
      <nav className="navbar">
        <Link to="/main" className="nav-button">Main Page</Link>
        <Link to="/profile" className="nav-button">User Profile</Link>
        <Link to="/group" className="nav-button">Group Profile</Link>
        <Link to="/action" className="nav-button">Create Action Plan</Link>
        <button className="logout-button">Log out</button>
      </nav>

     
      <div className="top-section">
        <div className="logo-section">
          <img src="/sdg_images/un_logo.png" alt="UN Logo" className="un-logo" />
          <img src="/sdg_images/sdg_wheel.png" alt="SDG Wheel" className="sdg-logo" />
        </div>

        
        <div className="search-section">
          <h2>Keyword search</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      
      <div className="sdg-grid">
        {sdgGoals.map((goal) => (
          <a
            key={goal.id}
            href={goal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="sdg-link"
          >
            <img
              src={`/sdg_images/${goal.id}.png`}
              alt={`SDG ${goal.id}`}
              className="sdg-icon"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
