import axios from "axios";
import { useState } from "react";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

const useLogin = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const [values, setValues] = useState({
          userEmail: "",
          userPassword: "",
     });

     const loginUser = async () => {
          try {
               const response = await axios.post(
                    "http://localhost:9000/api/login",
                    {
                         ...values,
                    },
                    {
                         withCredentials: true,
                    }
               );

               if (response.data.user) {
                    const { token, name, email, userId } = response.data.user;
                    localStorage.setItem("jwtToken", token);
                    localStorage.setItem(
                         "userData",
                         JSON.stringify({ name, email, userId })
                    );

                    dispatch(
                         loginSuccess({
                              token: token,
                              user: { name: name, email: email, userId: userId },
                         })
                    );

                    navigate(`/${userId}`);
               } else {
                    toast.error("please check your username and password", {
                         theme: "dark",
                         position: "top-right",
                    });
               }
          } catch (error) {
               console.error(error);
          }
     };

     const handleInputValues = (e) => {
          const { name, value } = e.target;
          console.log(value);
          setValues((prevValues) => ({
               ...prevValues,
               [name]: value,
          }));
     };

     const handleSubmit = (e) =>{
          e.preventDefault();
          loginUser();
        }

     return { loginUser, values, handleInputValues ,handleSubmit}
}

export default useLogin
