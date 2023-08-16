import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../redux/authSlice";

const useProfileNavbar = () => {

     const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showRequests, setShowRequests] = useState(false);
  const [showFriendList, setShowFriendList] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    dispatch(logoutSuccess());
    navigate("/login");
  };
  const handleShowConnectionRequests = () => {
    setShowRequests(!showRequests);
    setShowFriendList(false);
  };

  const handleShowFriendsList  = () => {
    setShowFriendList(!showFriendList);
    setShowRequests(false);
  };

  return {handleShowConnectionRequests,handleShowFriendsList,handleLogout,currentUser,showFriendList,showRequests}
}

export default useProfileNavbar
