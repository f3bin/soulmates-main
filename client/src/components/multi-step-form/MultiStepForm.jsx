import { useState } from "react";
import React from "react";
import "./MultiStepForm.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import useMultiStepForm from "./useMultiStepForm";

const MultiStepForm = () => {
  const{formData,handleInputChange,handleSubmit} =useMultiStepForm();
  // const user = useSelector((state) => state.auth.user);
  // const [formData, setFormData] = useState({
  //   personalInfo: {
  //     photo: "",
  //     phone:"",
  //     city: "",
  //     age:"",
  //     gender:"",
  //     height: "",
  //     diet: "",
  //     religion: "",
  //     motherTongue: "",
  //   },
  //   educationDetails: {
  //     highestQualification: "",
  //     completionYear: "",
  //   },
  //   aboutWork: {
  //     job: "",
  //     worksAs: "",
  //     yearlyIncome: "",
  //   },
  //   description: {
  //     aboutYou: "",
  //   },
  //   userInfo: {
  //     userId: user.userId,
  //   },
  // });

  // const handleInputChange = (section, field, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [section]: {
  //       ...prevData[section],
  //       [field]: value,
  //     },
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formDataToSend = new FormData();

  //   formDataToSend.append('image', formData.personalInfo.photo);
  //   formDataToSend.append('details', JSON.stringify(formData));

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:9000/api/profileUpdate",
  //       formDataToSend,
  //       {
  //         withCredentials: true,
         
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <form className="multistep_form-container" onSubmit={handleSubmit}>
      <h3>Complete your profile</h3>

      <div className="personal-info-form">
        <h2>Personal Info</h2>
        <label>Your photo</label>
        <input
          type="file"
          required
          onChange={(e) =>
            handleInputChange("personalInfo", "photo", e.target.files[0])
          }
        />
        <label>Phone </label>
        <input
          type="number"
          required
          value={formData.personalInfo.phone}
          onChange={(e) =>
            handleInputChange("personalInfo", "phone", e.target.value)
          }
        />
        <label>City</label>
        <input
          type="text"
          required
          value={formData.personalInfo.city}
          onChange={(e) =>
            handleInputChange("personalInfo", "city", e.target.value)
          }
        />
        <label>Age</label>
        <input
          type="number"
          required
          value={formData.personalInfo.age}
          onChange={(e) =>
            handleInputChange("personalInfo", "age", e.target.value)
          }
        />
         <label>Gender</label>
        <select
          required
          value={formData.personalInfo.gender}
          onChange={(e) =>
            handleInputChange("personalInfo", "gender", e.target.value)
          }
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>  
        </select>
        <label>height</label>
        <input
          type="number"
          required
          value={formData.personalInfo.height}
          onChange={(e) =>
            handleInputChange("personalInfo", "height", e.target.value)
          }
        />
        <label>Diet</label>
        <select
          required
          value={formData.personalInfo.diet}
          onChange={(e) =>
            handleInputChange("personalInfo", "diet", e.target.value)
          }
        >
          <option value="">Select</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Pescatarian">Pescatarian</option>
          <option value="Other">Other</option>
          <option value="Other">Other</option>
        </select>
        <label>Religion</label>
        <select
          required
          value={formData.personalInfo.religion}
          onChange={(e) =>
            handleInputChange("personalInfo", "religion", e.target.value)
          }
        >
          <option>Select</option>
          <option value="Hindu">Hindu</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
          <option value="Sikh">Sikh</option>
          <option value="Jain">jain</option>
          <option value="Other">Other</option>
        </select>
        <label>Mother Tongue</label>
        <select
          required
          value={formData.personalInfo.motherTongue}
          onChange={(e) =>
            handleInputChange("personalInfo", "motherTongue", e.target.value)
          }
        >
          <option>Select</option>
          <option value="Malayalam">Malayalam</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Telungu">Telungu</option>
          <option value="Kannada">Kannada</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="education-details-form">
        <h2>Education Details</h2>
        <label>Highest Qualification</label>
        <select
          required
          value={formData.educationDetails.highestQualification}
          onChange={(e) =>
            handleInputChange(
              "educationDetails",
              "highestQualification",
              e.target.value
            )
          }
        >
          <option required>Select</option>
          <option value="Graduate and above">Graduate and above</option>
          <option value="10th pass and above">10th pass and above</option>
          <option value="7th pass or Less">7th pass or Less</option>
          <option value="Other">Other</option>
        </select>
        <label required>Completion </label>
        <input
          type="date"
          value={formData.educationDetails.completionYear}
          onChange={(e) =>
            handleInputChange(
              "educationDetails",
              "completionYear",
              e.target.value
            )
          }
        />
      </div>

      <div className="job-details-form">
        <h2>Job Details</h2>
        <label>Job role</label>
        <input
          type="text"
          required
          value={formData.aboutWork.job}
          onChange={(e) =>
            handleInputChange("aboutWork", "job", e.target.value)
          }
        />
        <label>Works at</label>
        <input
          type="text"
          onChange={(e) =>
            handleInputChange("aboutWork", "worksAs", e.target.value)
          }
        />
        <label>Yearly Income</label>
        <input
          type="number"
          required
          value={formData.aboutWork.yearlyIncome}
          onChange={(e) =>
            handleInputChange("aboutWork", "yearlyIncome", e.target.value)
          }
        />
      </div>

      <div className="description-form">
        <label>Describe about you</label>
        <textarea
          typeof="text"
          cols="30"
          rows="10"
          value={formData.description.aboutYou}
          onChange={(e) =>
            handleInputChange("description", "aboutYou", e.target.value)
          }
        ></textarea>
      </div>
      <div className="submit-button">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default MultiStepForm;
