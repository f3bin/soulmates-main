import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, fetchUserProfiles } from "../../redux/usersSlice";
import { fetchConnections, fetchDuoConnections } from "../../redux/connectionSlice";
import axios from 'axios';
import { useEffect,useState } from "react";
import { toast } from 'react-toastify'

const useUserList = () => {

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const userProfiles = useSelector((state) => state.users.profileData);
     const currentUser = useSelector((state) => state.auth.user);
     const connectionData = useSelector((state) => state.connection.connections);
     const { users ,status, error } = useSelector((state) => state.users);
     const duoConnections = useSelector(
          (state) => state.connection.duoConnections
     );

     useEffect(() => {
          dispatch(fetchUsers());
          dispatch(fetchUserProfiles());
          dispatch(fetchConnections());
          dispatch(fetchDuoConnections());
     }, [dispatch]);

     //to sort out the profile of the loggedin person while listing the whole users
     const filteredUsers = users.filter(
          (user) =>
               user._id !== currentUser.userId &&
               userProfiles.some((profile) => profile.userInfo === user._id)
     );

     //checking  the  users whom tried to connect with the user who is logged in
     const connectedUsers = connectionData.filter((connection) => {
          return connection.LoggedInUserId === currentUser.userId 
     });

     //checking the profiles to take the exact profile of the user
     const filteredSelfProfile = userProfiles.find(
          (profile) => profile.userInfo === currentUser.userId
     );

     //searching through the whole duocollection list to take the collections which is only the logged user is included
     const userDuoConnections = duoConnections.filter((duoConnection) => {
          return (
               duoConnection.LoggedInUserId === currentUser.userId ||
               duoConnection.AcceptingConnectionUser === currentUser.userId
          );
     });

     //finding friends id
     const friendId = userDuoConnections.map((userConnection) => {
          return userConnection.LoggedInUserId === currentUser.userId
               ? userConnection.AcceptingConnectionUser
               : userConnection.LoggedInUserId;
     });

     const handleViewProfile = (id, currentUserId) => {
          navigate(`/${id}/profile`);
     };

     const handleConnect = (id) => {
          // Filter connectionData to find requests sent by the currentUser
          const sentRequests = connectionData.filter((connection) => {
               return connection.SecondUserId === currentUser.userId;
          });

          // Check if the current user has already sent a request to connect with the user with the given 'id'
          const alreadySentRequest = sentRequests.some((connection) => {
               return connection.LoggedInUserId === id;
          });

          if (alreadySentRequest) {
               toast.info("The user has already send you a request to connect");
          } else {
               const LoggedInUserId = currentUser.userId;
               const SecondUserId = id;
               const connectionData = { LoggedInUserId, SecondUserId };

               axios
                    .post("http://localhost:9000/api/connections", connectionData)
                    .then((response) => {
                         console.log("Connection data sent successfully:", response.data);
                         // Update local state with the new connection
                         dispatch(fetchConnections());
                         dispatch(fetchDuoConnections());
                         toast.success("Connection request send", {
                              theme: "dark",
                         });
                    })
                    .catch((err) => {
                         console.error("Error creating connection:", err);
                         // Handle the error gracefully, show a message, or perform other actions.
                    });
          }
     };
     const handleNoProfile = (id) => {
          toast.warning(
               "You can't perform this action because your profile is incomplete.",
               { theme: "dark" }
          );
     };

     const handleAlreadyConnected = () => {
          toast.warning("Already Connected", {
               theme: "dark",
          });
     };


     const usersPerPage = 4; // Number of users to display per page
     const [currentPage, setCurrentPage] = useState(1);

     // Calculate the indexes for the current page
     const startIndex = (currentPage - 1) * usersPerPage;
     const endIndex = startIndex + usersPerPage;

     // Filtered users for the current page
     const usersForCurrentPage = filteredUsers.slice(startIndex, endIndex);

     const filterappliedUsers = useSelector(state => state.users.filterAppliedUserData);

     return { filteredUsers, connectedUsers, filteredSelfProfile,
           userDuoConnections, friendId, handleViewProfile, handleConnect,
            handleNoProfile, handleAlreadyConnected ,userProfiles,currentUser,status,error,usersForCurrentPage,setCurrentPage
          ,currentPage,endIndex,filterappliedUsers}
}

export default useUserList
