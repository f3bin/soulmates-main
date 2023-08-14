import React from "react";
import MultiStepForm from "../../components/multi-step-form/MultiStepForm";
import './ProfileCreation.scss'
import ProfileNavbar from "../../components/profile-navbar/ProfileNavbar";


const ProfileCreation = () => {
  return (
    <div className="complete-profile-container">
      <ProfileNavbar />
      <MultiStepForm />
    </div>
  );
};

export default ProfileCreation;
