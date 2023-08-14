import { useSelector } from "react-redux";
import { useParams ,useNavigate} from "react-router-dom";

const useProfileContent = () => {
     const navigate  = useNavigate();
     const currentUser = useSelector((state) => state.auth.user);
     const profileData = useSelector((state) => state.users.profileData);
     const users = useSelector((state) => state.users.users);
   
     const { id } = useParams();
     console.log(id, users, "paramuserdata ");
   
     //finding user with the params id
     const paramsUser = users.find((user) => user._id === id);
   
     // checking the profiles to take the exact profile of the params id
     const filteredSelfProfile = profileData.find(
       (profile) => profile.userInfo === id
     );
     console.log(filteredSelfProfile, "filteredselfprofile");
   
     const isCurrentUser = currentUser.userId === id;
     
     const goBack = () =>{
          navigate(-1);
     }
   

  return {paramsUser,filteredSelfProfile,isCurrentUser,goBack}
}

export default useProfileContent
