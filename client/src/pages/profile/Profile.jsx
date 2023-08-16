import React from "react";
import ProfileNavbar from "../../components/profile-navbar/ProfileNavbar";
import "./Profile.scss";
import ProfileContent from "../../components/profile-content/ProfileContent";

const Profile = () => {
  return (
    <div className="profile-container">
      <ProfileNavbar />
      <ProfileContent />   
    </div>  
  );
};

export default Profile;
