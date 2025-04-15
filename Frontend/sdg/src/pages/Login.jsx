import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [user, setUser] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Please enter email"),
    password: Yup.string().required("Please enter password"),
  });

  const handleSubmit = (values) => {
    console.log("login data:", values);
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
<<<<<<< HEAD
       <div className="min-h-screen bg-gray-100">
=======
      <div className="min-h-screen bg-gray-100">
>>>>>>> userProfile-wenjun
        <nav className="bg-cyan-600 text-white px-6 py-2 flex gap-6">
          <Link to="/" className="hover:underline">Main Page</Link>
          <Link to="/profile" className="hover:underline">User Profile</Link>
          <Link to="/group" className="hover:underline">Group Profile</Link>
          <Link to="/plan" className="hover:underline">Create Action Plan</Link>
        </nav>
      </div>
<<<<<<< HEAD
=======

>>>>>>> userProfile-wenjun
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <Field name="email" placeholder="Email" className="w-full p-2 border rounded" />
              {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <Field name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" />
              {errors.password && touched.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <Button text="Login" type="submit" />

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
