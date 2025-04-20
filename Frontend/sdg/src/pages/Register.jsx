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
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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
            <Button text={isSubmitting ? "Registering..." : "Register"} type="submit" />
            <div className="text-center mt-4">
              <Link to="/login" className="text-blue-500 text-sm">Had account? Login</Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Register;
