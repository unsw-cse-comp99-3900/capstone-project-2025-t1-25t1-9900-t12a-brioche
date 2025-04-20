import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Please enter email"),
    password: Yup.string().required("Please enter password"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/register/", values);
      console.log("Register success:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-page-box">
        <h2 className="auth-page-title">Register</h2>
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
              <Button text={isSubmitting ? "Registering..." : "Register"} type="submit" />
              <div className="text-center mt-4">
                <Link to="/login" className="text-blue-500 text-sm">Had account? Login</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
