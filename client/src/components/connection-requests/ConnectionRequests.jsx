import React from "react";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import "./ConnectionRequests.scss";
import useConnectionRequests from "./useConnectionRequests";
import Loader from "../loader/Loader";

const ConnectionRequests = () => {
  const {
    connectionReqData,
    handleAcceptRequest,
    handleIgnoreRequest,
    users,
    profileData,
    status,
    error,
  } = useConnectionRequests();

  return (
    <div className="connection-requests-container">
      <h3>Connection Requests</h3>
      {status === "loading" && <Loader />}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && connectionReqData.length === 0 ? (
        <div className="request-item">
          <h3>No connection requests now</h3>
        </div>
      ) : (
        connectionReqData.map((request) => {
          const connectedUser = users.find(
            (user) => user._id === request.LoggedInUserId
          );
          const connectedUserProfile = profileData.find(
            (profile) => profile.userInfo === request.LoggedInUserId
          );

          if (connectedUser && connectedUserProfile) {
            return (
              <div key={request._id} className="request-item">
                <div className="request-section">
                  <img
                    src={`http://localhost:9000/uploads/${connectedUserProfile.photo}`}
                    alt=""
                  />
                  <h3>{connectedUser.name}</h3>
                </div>
                <div className="request-section">
                  <FiUserCheck
                    className="accept-btn"
                    onClick={() =>
                      handleAcceptRequest(connectedUser._id, request._id)
                    }
                  />
                  <FiUserX
                    className="ignore-btn"
                    onClick={() => handleIgnoreRequest(request._id)}
                  />
                </div>
              </div>
            );
          }
          return null;
        })
      )}
    </div>
  );
};

export default ConnectionRequests;
