import React from "react";
import "./ProfileContent.scss";
import { Link } from "react-router-dom";
import useProfileContent from "./useProfileContent";
import { IoArrowBack } from "react-icons/io5";

const ProfileContent = () => {
  const { paramsUser, filteredSelfProfile, isCurrentUser, goBack } =
    useProfileContent();
  return (
    <>
      <IoArrowBack
        onClick={goBack}
        className="back-arrow"
        color="black"
        size={35}
      />
      {filteredSelfProfile ? (
        <div className="profile-content-container">
          <div className="profile-header-container">
            <div className="profile-header">
              <div className="profile-picture">
                <img
                  src={`http://localhost:9000/uploads/${filteredSelfProfile.photo}`}
                  alt="Profile"
                />
              </div>
              <div className="profile-info">
                <h2>{paramsUser.name}</h2>
                <p>{paramsUser.email}</p>

                {isCurrentUser ? (
                  <button>Edit profile</button>
                ) : (
                  <p>it will show whether connected or not </p>
                )}
              </div>
            </div>
            <div className="profile-bio">
              <p>{filteredSelfProfile.description}</p>
            </div>
          </div>
          <div className="profile-body">
            <div className="profile-body-left">
              <h3>Details</h3>
              <div className="profile-details">
                <h2>Personal Details</h2>
                <div className="detail-item">
                  <label>City</label>
                  <p>{filteredSelfProfile.city}</p>
                </div>
                <div className="detail-item">
                  <label>Height</label>
                  <p>{filteredSelfProfile.height}</p>
                </div>
                <div className="detail-item">
                  <label>Diet</label>
                  <p>{filteredSelfProfile.diet}</p>
                </div>
                <div className="detail-item">
                  <label>Religion</label>
                  <p>{filteredSelfProfile.religion}</p>
                </div>
                <div className="detail-item">
                  <label>Mother Tongue</label>
                  <p>{filteredSelfProfile.motherTongue}</p>
                </div>
                <h2>Education Details</h2>
                <div className="detail-item">
                  <label>Highest Qualification</label>
                  <p>{filteredSelfProfile.highestQualification}</p>
                </div>
                <div className="detail-item">
                  <label>Completion year</label>
                  <p>{filteredSelfProfile.completionYear}</p>
                </div>
                <h2>About Job</h2>
                <div className="detail-item">
                  <label>Job Role</label>
                  <p>{filteredSelfProfile.jobRole}</p>
                </div>
                <div className="detail-item">
                  <label>Yearly Income</label>
                  <p>{filteredSelfProfile.yearlyIncome}</p>
                </div>
              </div>
            </div>
            <div className="profile-body-right">
              <h3>Feeds</h3>
              <div className="feed-body"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="incomplete-profile">
          <h3>Hi {paramsUser.name}</h3>
          <p>
            Please complete your profile{" "}
            <Link to="complete-profile" className="complete-profile-link">
              Complete Profile
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default ProfileContent;
