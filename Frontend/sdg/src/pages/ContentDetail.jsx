import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../components/ContentDetail.css';

const mockContent = {
  id: 1,
  title: 'Reducing Poverty through Education',
  description: 'Exploring how access to education lowers poverty rates.',
  fullText1:
    'Education empowers individuals to lift themselves out of poverty by increasing employment opportunities, wages, and overall quality of life.',
  fullText2:
    'Global initiatives aim to provide universal access to primary and secondary education to ensure that every child, regardless of background, has a fair chance.',
};

const ContentDetail = () => {
  const { id } = useParams(); // 如果以后你传动态id用得到
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/search');
  };

  return (
    <div className="content-detail-container">
      {/* ✅ 顶部导航栏 */}
      <nav className="navbar">
        <Link to="/main" className="nav-button">Main Page</Link>
        <Link to="/profile" className="nav-button">User Profile</Link>
        <Link to="/group" className="nav-button">Group Profile</Link>
        <Link to="/action" className="nav-button">Create Action Plan</Link>
        <button className="logout-button">Log out</button>
      </nav>

      {/* ✅ 返回按钮 */}
      <button onClick={handleBack} className="back-button">Back</button>

      {/* ✅ 内容标题和正文 */}
      <div className="content-box">
        <h2 className="content-title">{mockContent.title}</h2>
        <p className="content-description">{mockContent.description}</p>

        <div className="content-section">
          <p>{mockContent.fullText1}</p>
        </div>

        <div className="content-section">
          <p>{mockContent.fullText2}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
