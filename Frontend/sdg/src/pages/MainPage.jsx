<<<<<<< HEAD
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> userProfile-wenjun
import { Link } from 'react-router-dom';
import '../components/Style/MainPage.css';
import Navbar from '../components/Navbar';

<<<<<<< HEAD
=======

>>>>>>> userProfile-wenjun
const sdgGoals = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  url: `https://sdgs.un.org/goals/goal${i + 1}`,
}));

const MainPage = () => {
<<<<<<< HEAD
  return (
    <div className="main-page-container">
      <Navbar />
      <div className="top-section">
        <div className="logo-section">
          <img src="/sdg_images/un_logo.png" alt="United Nations Logo" className="un-logo" />
          <img src="/sdg_images/sdg_wheel.png" alt="SDG Color Wheel" className="sdg-logo" />
        </div>

        <div className="search-section">
          <h2>Keyword search</h2>
          <div className="search-box">
            <input type="text" placeholder="Enter keyword" />
            <button>Search</button>
          </div>
        </div>
      </div>

=======
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    if (!keyword.trim()) return;
    const searchUrl = `https://sdg.unswzoo.com/search/?mode=contains&keyword=${encodeURIComponent(keyword)}`;
    window.open(searchUrl, '_blank'); 
  };

  return (
    <div className="main-page-container">
      <Navbar />

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
>>>>>>> userProfile-wenjun
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
