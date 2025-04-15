import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/SearchResults.css';
import { Link } from 'react-router-dom';


const mockResults = [
  {
    id: 1,
    title: 'Reducing Poverty through Education',
    description: 'Exploring how access to education lowers poverty rates.',
    sdgs: [1, 4],
  },
  {
    id: 2,
    title: 'Clean Water Innovations',
    description: 'Technologies providing clean water in rural areas.',
    sdgs: [6, 9],
  },
  {
    id: 3,
    title: 'Climate Action with AI',
    description: 'How artificial intelligence helps track emissions.',
    sdgs: [13, 9],
  },
];

const SearchResults = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    // 将来可以传更多数据
    navigate(`/content/${id}`);
  };

  return (
    <div className="search-results-container">
      {/* 顶部导航栏 */}
      <nav className="navbar">
        <Link to="/main" className="nav-button">Main Page</Link>
        <Link to="/profile" className="nav-button">User Profile</Link>
        <Link to="/group" className="nav-button">Group Profile</Link>
        <Link to="/action" className="nav-button">Create Action Plan</Link>
        <button className="logout-button">Log out</button>
      </nav>

      <h2 className="search-header">Search results for the keyword “...”</h2>

      <div className="results-list">
        {mockResults.map((item) => (
          <div
            key={item.id}
            className="content-card"
            onClick={() => handleCardClick(item.id)}
          >
            <h3 className="card-title">{item.title}</h3>
            <p className="card-description">{item.description}</p>
            <div className="sdg-icons">
              {item.sdgs.map((num) => (
                <img
                  key={num}
                  src={`/sdg_images/${num}.png`}
                  alt={`SDG ${num}`}
                  className="sdg-icon-small"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
