import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";

import GroupProfile from "./pages/GroupProfile";  
import MainPage from "./pages/MainPage";  
import SearchResults from './pages/SearchResults';
import ContentDetail from './pages/ContentDetail';




function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<UserProfile />} />

      <Route path="/group" element={<GroupProfile />} />  
      <Route path="/main" element={<MainPage />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/content/:id" element={<ContentDetail />} />

    </Routes>
  );
}

export default AppRoutes;
