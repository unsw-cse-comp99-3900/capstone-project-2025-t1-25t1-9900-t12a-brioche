import React, { useState } from "react";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/api/reset-password/", {
        email,
        new_password: newPassword,
      });
      alert("Password reset successful");
    } catch (error) {
      alert("Error resetting password");
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-4">Reset password</h2>
      <input
        type="email"
        placeholder="Enter email"
        className="w-full p-2 border rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="New password"
        className="w-full p-2 border rounded mb-4"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button text="Reset Password" onClick={handleSubmit} />
    </AuthLayout>
  );
};

export default ResetPassword;
