import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../components/Style/AuthPages.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
    <div className="auth-page-container">
      <div className="auth-page-box">
        <h2 className="auth-page-title">Login</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="input-group">
                <Field name="email" placeholder="Email" className="input-field" />
                {errors.email && touched.email && <p className="error-text">{errors.email}</p>}
              </div>
              <div className="input-group">
                <Field name="password" type="password" placeholder="Password" className="input-field" />
                {errors.password && touched.password && <p className="error-text">{errors.password}</p>}
              </div>
              <div className="button-group">
              <button type="submit" disabled={isSubmitting} className="login-button">
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
                <Link to="/register" className="register-button">
                  Register
                </Link>
              </div>
              <Link to="/reset-password" className="auth-page-link">Forgot password?</Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
