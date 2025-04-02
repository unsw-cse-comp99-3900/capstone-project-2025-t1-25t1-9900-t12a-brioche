import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";

const Register = () => {
  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input type="text" placeholder="Email" className="w-full p-2 border rounded mb-4" />
      <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" />
      <Button text="Register" />
      <div className="text-center mt-4">
        <Link to="/login" className="text-blue-500 text-sm">Had account? Login</Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
