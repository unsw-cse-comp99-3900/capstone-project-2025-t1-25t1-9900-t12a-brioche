import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";


function AppRoutes() {
  return (
    <Routes>
      {/* ✅ 这个将 "/" 指向 Login 页面 */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}

export default AppRoutes;
