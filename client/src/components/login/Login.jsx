import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Login.scss";
import useLogin from "./useLogin";

const Login = () => {
  const { handleSubmit, values, handleInputValues } = useLogin();
  return (
    <div className="login-container">
      <div className="login-wrapper"> 
        <div className="login-title">
          <span>Login Form</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-row">
            <input
              type="email"
              placeholder="enter your email"
              value={values.userEmail}
              className="email-input"
              name="userEmail"
              required
              onChange={handleInputValues}
            />
          </div>
          <div className="login-row">
            <input
              type="password"
              placeholder="enter your password"
              value={values.userPassword}
              name="userPassword"
              required
              onChange={handleInputValues}
            />
          </div>

          <div className="login-row button">
            <button type="submit">Login</button>
          </div>
          <div className="login-signup-link">
            Not a member?{" "}
            <Link className="links" to="/register">
              Signup now
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
