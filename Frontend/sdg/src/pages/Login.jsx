import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Please enter email"),
    password: Yup.string().required("Please enter password"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", values);
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      navigate("/main");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-cyan-600 text-white px-6 py-2 flex gap-6">
          <Link to="/" className="hover:underline">Main Page</Link>
          <Link to="/profile" className="hover:underline">User Profile</Link>
          <Link to="/group" className="hover:underline">Group Profile</Link>
          <Link to="/plan" className="hover:underline">Create Action Plan</Link>
        </nav>
      </div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Field name="email" placeholder="Email" className="w-full p-2 border rounded" />
              {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <Field name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" />
              {errors.password && touched.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <Button text={isSubmitting ? "Logging in..." : "Login"} type="submit" disabled={isSubmitting} />
            <div className="text-center mt-4">
              <Link to="/reset-password" className="text-blue-500 text-sm">Forget password?</Link>
            </div>
            <div className="text-center mt-2">
              <Link to="/register" className="text-blue-500 text-sm">Not account? register it!</Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
