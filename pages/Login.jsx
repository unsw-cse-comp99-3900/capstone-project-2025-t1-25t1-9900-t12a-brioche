import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";

const Login = () => {
  const [message, setMessage] = useState("");

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage("Login successful");
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        window.location.href = "/main";
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      setMessage("An error occurred, please try again");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {message && <p className="text-red-500 text-sm">{message}</p>}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <Field name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" />
              {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <Field name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" />
              {errors.password && touched.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <Button text="Login" type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded" />

            <div className="text-center mt-4">
              <Link to="/reset-password" className="text-blue-500 text-sm">Forgot password?</Link>
            </div>
            <div className="text-center mt-2">
              <Link to="/register" className="text-blue-500 text-sm">Don't have an account? Register</Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
