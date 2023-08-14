import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosPersonAdd } from "react-icons/io";
import { FaUsersLine } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./ProfileNavbar.scss";
import ConnectionRequests from "../connection-requests/ConnectionRequests";
import FriendList from "../friendlist/FriendList";
import useProfileNavbar from "./useProfileNavbar";

const ProfileNavbar = () => {
  const {
    handleShowConnectionRequests,
    handleShowFriendsList,
    handleLogout,
    currentUser,
    showFriendList,
    showRequests
  } = useProfileNavbar();


  return (
    <div className="profile_navbar-container">
      <div className="profile_navbar-left">
        <Link to={`/${currentUser.userId}`} className="links">
          <h1>soulMates</h1>
        </Link>
        <p>connecting hearts since 2000</p>
      </div>
      <div className="profile_navbar-right">
        <FaUsersLine
          size={40}
          color="white"
          className="btn-connectionlist"
          onClick={handleShowFriendsList}
        />
        {showFriendList && <FriendList />}
        <IoIosPersonAdd
          className="btn-connection-requests"
          size={40}
          color="white"
          onClick={handleShowConnectionRequests}
        />
        {showRequests && <ConnectionRequests />}
        <Link className="links" to={`/${currentUser.userId}/profile`}>
          <CgProfile size={40} color="white" />
        </Link>
        <button className="profile-navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileNavbar;
