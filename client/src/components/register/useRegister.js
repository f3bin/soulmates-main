import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useRegister = () => {

     //initial values of the stat
  const [values, setValues] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  //function to register user with backend while registering
  const registerUser = async () => {
     try {
          const response = await axios.post(
            "http://localhost:9000/api/register",
            {
              ...values,
            },
            {
              withCredentials: true,
            }
          );
        
          if (response.data.status === 'ok') {   
            setValues({ userName: "", userEmail: "", userPassword: "" });
            toast.success("Registration successful!",{
              position: "top-right"
            });
          } else if (response.data.status === 'error' && response.data.error === 'duplicate email') {
            toast.error("Email address is already registered", {
              position: "top-right"
            });
          } else {
            toast.error("Registration failed", {
              position: "top-right"
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
     registerUser();
   }

  return {
    handleSubmit,
    values,
    handleInputValues
  };
}

export default useRegister;
