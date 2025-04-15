import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function RegisterPage() {
    return (
      <div className="container">
        <div className="login-box">
          <h2>Register</h2>
          <form>
            <div className="input-group">
              <label>Username / Email address *</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label>Password *</label>
              <input type="password" />
            </div>
            <div className="button-group">
              <button className="register-button">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  export default RegisterPage;