import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
<<<<<<< HEAD
// test
=======
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

>>>>>>> 5ad673ee269d7636dcbc5009bfa4b168d4521e22
const Login = () => {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const [user, setUser] = useState(null);

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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("Google login success:", result.user);
    } catch (error) {
      console.error("Google login failed:", error);
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
              <Link to="/register" className="text-blue-500 text-sm">No account? Register it!</Link>
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-6 text-center">
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Google
        </button>

        {user && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-semibold">Welcome, {user.displayName}</p>
            <p className="text-sm text-gray-700">{user.email}</p>
            <img src={user.photoURL} alt="avatar" className="mx-auto mt-2 rounded-full w-12 h-12" />
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default Login;
