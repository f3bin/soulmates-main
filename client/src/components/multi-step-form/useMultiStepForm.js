import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {toast} from 'react-toastify'

const useMultiStepForm = () => {
     const user = useSelector((state) => state.auth.user);
    
     const initialState = {
      personalInfo: {
        photo: "",
        phone: "",
        city: "",
        age: "",
        gender: "",
        height: "",
        diet: "",
        religion: "",
        motherTongue: "",
      },
      educationDetails: {
        highestQualification: "",
        completionYear: "",
      },
      aboutWork: {
        job: "",
        worksAs: "",
        yearlyIncome: "",
      },
      description: {
        aboutYou: "",
      },
      userInfo: {
        userId: user.userId,
      },
    };

     const [formData, setFormData] = useState(initialState);
   
     const handleInputChange = (section, field, value) => {
       setFormData((prevData) => ({
         ...prevData,
         [section]: {
           ...prevData[section],
           [field]: value,
         },
       }));
     };
   
     const handleSubmit = async (e) => {
       e.preventDefault();
       const formDataToSend = new FormData();
   
       formDataToSend.append('image', formData.personalInfo.photo);
       formDataToSend.append('details', JSON.stringify(formData));
   
       try {
         const response = await axios.post(
           "http://localhost:9000/api/profileUpdate",
           formDataToSend,
           {
             withCredentials: true,
            
           }
         );
         console.log(response.data);
         toast.success("Created Profile Succesfully",{
          theme:"dark"
         });
         setFormData(initialState);
       } catch (error) {
         console.error(error);
       }
     };
  return {formData,handleInputChange,handleSubmit}
}

export default useMultiStepForm
