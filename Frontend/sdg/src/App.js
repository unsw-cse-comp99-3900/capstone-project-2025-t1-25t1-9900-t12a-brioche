import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UserProfile from './pages/UserProfile';
import GroupProfile from './pages/GroupProfile';
import CreateActionPlan from './pages/CreateActionPlan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/group" element={<GroupProfile />} /> 
        <Route path="/action" element={<CreateActionPlan />} /> 
      </Routes>
    </Router>
  );
}

export default App;