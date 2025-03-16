import React from "react";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-4">Reset password</h2>
      <input type="email" placeholder="enter email address" className="w-full p-2 border rounded mb-4" />
      <Button text="Send the reset link to email" />
    </AuthLayout>
  );
};

export default ResetPassword;
