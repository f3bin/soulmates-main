import { useSelector } from "react-redux";

const useWelcome = () => {
     const user = useSelector((state) => state.auth.user);
     const userProfiles = useSelector((state) => state.users.profileData);
   
     const filteredSelfProfile = userProfiles.find(
       (profile) => profile.userInfo === user.userId
     );
   
  return {filteredSelfProfile }
}

export default useWelcome
