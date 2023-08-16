import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { fetchConnections } from "../../redux/connectionSlice";

const useConnectionRequests = () => {
     const dispatch = useDispatch();
     const currentUser = useSelector((state) => state.auth.user);
     const connectionData = useSelector((state) => state.connection.connections);
     const {users,profileData,status,error} =useSelector(state => state.users)
   
   
     useEffect(() => {
       dispatch(fetchConnections());
     }, [dispatch]);
   
     const connectionReqData = connectionData.filter((connection) => {
       return connection.SecondUserId === currentUser.userId;
     });
   
     const handleAcceptRequest = (id,connectionId) => {
       const LoggedInUserId = currentUser.userId;
       const AcceptingConnectionUser = id;
       const duoConnectionList = { LoggedInUserId, AcceptingConnectionUser ,connectionId};
     
       axios
         .post("http://localhost:9000/api/createDuoConnections", duoConnectionList)
         .then((response) => {
           console.log("duo connected successfully", response.data);
           dispatch(fetchConnections());
         })
         .catch((err) => {
           console.log(err, "error in creating duo-connection");
         });
     };
     
   
     const handleIgnoreRequest = (id) => {
       axios
         .delete(`http://localhost:9000/api/connections/${id}`)
         .then((response) => {
           console.log("Request ignored successfully", response.data);
           dispatch(fetchConnections());
         })
         .catch((error) => {
           console.error("Error ignoring request", error);
         });
     };
   

  return {connectionReqData,handleAcceptRequest,handleIgnoreRequest,users,profileData,status,error}
}

export default useConnectionRequests
