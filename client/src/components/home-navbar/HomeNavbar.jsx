import React from "react";
import { Link } from "react-router-dom";
import './HomeNavbar.scss'

const HomeNavbar = () => {
  return (
    <div className="home_navbar-container">
      <div className="home_navbar-left">
        <h1>soulMates</h1>
        <p>connecting hearts since 2000</p>
      </div>
      <div className="home_navbar-right">
      <Link className="links" to="/register"><button>Register </button></Link>
      <Link className="links" to="/login"><button>Login</button></Link>   
          
      </div>
    </div>
  );
};

export default HomeNavbar;
