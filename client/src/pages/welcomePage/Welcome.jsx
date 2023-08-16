import React,{useState} from "react";
import ProfileNavbar from "../../components/profile-navbar/ProfileNavbar";
import "./Welcome.scss";
import ProfileFilter from "../../components/profile-filter/ProfileFilter";
import UsersList from "../../components/users-list/UsersList";
import useWelcome from "./useWelcome";

const Welcome = () => {
  const { filteredSelfProfile} = useWelcome();

 

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <ProfileNavbar />
        <div className="profile-filter-container">
          <ProfileFilter />
        </div>
        {!filteredSelfProfile && (
          <div className="warning-profile">Your profile is incomplete </div>
        )}
      </div>
      <div className="welcome-body">
        <UsersList  />
      </div>
    </div>
  );
};

export default Welcome;
