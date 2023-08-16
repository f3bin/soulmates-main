import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './Register.scss';
import useRegister from "./useRegister";

const Register = () => {
const {handleSubmit,values,handleInputValues} =useRegister();


  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-title"><span>Register Form</span></div>
        <form onSubmit={handleSubmit}>
          <div className="register-row">
            <input
              type="text"
              placeholder="Enter your name"
              value={values.userName}
              name="userName"
              required
              onChange={handleInputValues}
            />
          </div>
          <div className="register-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={values.userEmail}
              name="userEmail"
              required
              onChange={handleInputValues}
            />
          </div>
          <div className="register-row">
            <input
              type="password"
              placeholder="Choose a password"
              value={values.userPassword}
              name="userPassword"
              required
              onChange={handleInputValues}
            />
          </div>
          <div className="register-row button">
            <button type="submit">Register</button>
          </div>
          <div className="register-signup-link">Already a member? <Link className="links" to="/login">Login</Link></div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;




