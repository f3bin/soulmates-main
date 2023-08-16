import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { fetchDuoConnections } from "../../redux/connectionSlice";

const useFriendList = () => {
     const dispatch = useDispatch();
     const currentUser = useSelector((state) => state.auth.user);
     const {users,status ,profileData,error} = useSelector((state) => state.users);
     const duoConnections = useSelector(
       (state) => state.connection.duoConnections
     );
     
   
     const userConnections = duoConnections.filter((duoConnection) => {
       return (
         duoConnection.LoggedInUserId === currentUser.userId ||
         duoConnection.AcceptingConnectionUser === currentUser.userId
       );
     });
   
     //removing friend from the friendlist
     const handleRemoveFriend = (id) =>{
       axios
       .delete(`http://localhost:9000/api/duoConnections/${id}`)
       .then((response) => {
         console.log("Request ignored successfully", response.data);
         dispatch(fetchDuoConnections());
       })
       .catch((error) => {
         console.error("Error ignoring request", error);
       });
     }
   
     
     useEffect(() => {
       dispatch(fetchDuoConnections());
     }, [dispatch]);
   
    
  return {handleRemoveFriend,userConnections,profileData,users,currentUser,status,error}
}

export default useFriendList
