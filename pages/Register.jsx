import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const handleRegister = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Registration successful! Please log in.");
    } else {
      setMessage(data.email ? data.email[0] : data.password ? data.password[0] : "Registration failed");
    }
  } catch (error) {
    setMessage("Network error: Unable to reach server.");
  }
};

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && <p className="text-red-500">{message}</p>}
      <input
        type="text"
        placeholder="Email"
        className="w-full p-2 border rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="Register" onClick={handleRegister} />
      <div className="text-center mt-4">
        <Link to="/login" className="text-blue-500 text-sm">Had account? Login</Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
