import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";
import GroupProfile from "./pages/GroupProfile";  // 👈 新增
import MainPage from "./pages/MainPage";  // ✅ 新增
import CreateActionPlan from './pages/CreateActionPlan';
import CreateActionPlan2 from './pages/CreateActionPlan2';

function AppRoutes() {
  return (
    <Routes>
      {/* ✅ 这个将 "/" 指向 Login 页面 */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/group" element={<GroupProfile />} />  // 👈 新增
      <Route path="/main" element={<MainPage />} />
      <Route path="/action" element={<CreateActionPlan />} /> 
      <Route path="/action/step2" element={<CreateActionPlan2 />} />
    </Routes>
  );
}

export default AppRoutes;
