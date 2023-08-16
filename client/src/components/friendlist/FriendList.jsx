import React from "react";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import "./FriendList.scss";
import useFriendList from "./useFriendList";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";

const FriendList = () => {
  const {
    handleRemoveFriend,
    userConnections,
    profileData,
    users,
    currentUser,
    status,
    error,
  } = useFriendList();

  return (
    <div className="friendlist-container">
      <h3>FriendList</h3>
      <div className="friendlist-items">
        {status === "loading" && <Loader />}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" &&
          userConnections.map((userConnection) => {
            const friendId =
              userConnection.LoggedInUserId === currentUser.userId
                ? userConnection.AcceptingConnectionUser
                : userConnection.LoggedInUserId;

            const friend = users.find((user) => user._id === friendId);

            if (friend) {
              const friendData = profileData.find((profile) => {
                return friend._id === profile.userInfo;
              });

              return (
                <div key={friend._id} className="friendlist-item">
                  <Link to={`/${friend._id}/profile`} className="link"><img
                    src={`http://localhost:9000/uploads/${friendData.photo}`}
                    alt=""
                  /></Link>
                  <h4>{friend.name}</h4>
                  <MdPersonRemoveAlt1
                    color="red"
                    size={30}
                    className="friend-remove-btn"
                    onClick={() => handleRemoveFriend(userConnection._id)}
                  />
                </div>
              );
            }

            return null;
          })}
      </div>
    </div>
  );
};

export default FriendList;
