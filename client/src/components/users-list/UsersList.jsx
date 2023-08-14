import React from "react";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "./UsersList.scss";
import useUserList from "./useUserList";

const UsersList = () => {
  const {
    filteredUsers,
    connectedUsers,
    filteredSelfProfile,
    friendId,
    handleViewProfile,
    handleConnect,
    handleNoProfile,
    handleAlreadyConnected,
    userProfiles,
    currentUser,
    status,
    error
  } = useUserList();

  
  return (
    <div className="users-list-container">
      {status === "loading" && <p>Loading...</p>} 
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && filteredUsers.map((user) => {
        const profile = userProfiles.find(
          (profile) =>
            profile.userInfo === user._id &&
            profile.userInfo !== currentUser.userId
        );
        return (
        
          <div key={user._id} className="user-card">
            {profile && (
              <>
                <div className="user-card-image-part">
                  <img
                    src={`http://localhost:9000/uploads/${profile.photo}`}
                    alt=""
                  />
                </div>
                <div className="user-details-part">
                  <h3>{user.name}</h3>
                  <p> {profile.religion}</p>
                  <p>
                    {profile.city} || {profile.jobRole}
                  </p>
                </div>
                <div className="user-details-buttons">
                  <button
                    onClick={
                      filteredSelfProfile
                        ? () => handleViewProfile(user._id, currentUser.userId)
                        : () => handleNoProfile()
                    }
                    className="view-profile-btn"
                  >
                    View Profile
                  </button>
                  <button
                    className={
                      friendId.includes(user._id)
                        ? "alreadyConnected"
                        : connectedUsers.some(
                            (connection) => connection.SecondUserId === user._id
                          )
                        ? "clicked"
                        : "cancelled"
                    }
                    onClick={
                      filteredSelfProfile
                        ? friendId.includes(user._id)
                          ? () => handleAlreadyConnected()
                          : () => handleConnect(user._id)
                        : () => handleNoProfile()
                    }
                  >
                    {friendId.includes(user._id) ? (
                      <FaUsers />
                    ) : connectedUsers.some(
                        (connection) => connection.SecondUserId === user._id
                      ) ? (
                      <FaUserCheck />
                    ) : (
                      <FaUserPlus />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
      <ToastContainer />
    </div>
  );
};

export default UsersList;
