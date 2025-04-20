import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="container">
      <div className="login-box">
        <h1>Log In</h1>
        <form>
          <div className="input-group">
            <label>Username / Email address *</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Password *</label>
            <input type="password" />
          </div>
          <div className="password-reset">
            <a href="#">Reset your Password</a>
          </div>
          <div className="button-group">
            <button className="login-button">Log in</button>
            <button to="/register" className="register-button">Register</button>
          </div>
        </form>
        <div className="separator">Or</div>
        <div className="social-login">
          <button className="facebook">Continue with Facebook</button>
          <button className="google">Continue with Google</button>
          <button className="apple">Continue with Apple</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
