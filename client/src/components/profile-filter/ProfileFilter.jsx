import React from "react";
import './ProfileFilter.scss';
import useProfileFilter from "./useProfileFilter";

const ProfileFilter = () => {

const {handleFilterChange,handleSubmit} =useProfileFilter(); 
  return (
    <form className="profile_filter-container" onSubmit={handleSubmit}>
      <div className="filter-item">
        <label>I'm looking for :</label>
        <select required onChange={handleFilterChange("gender")}>
          <option>Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        
      </div>
      <div className="filter-item">
        <label>Age</label>
        <input type="number" min={18}  required  onChange={handleFilterChange("age")}/>
      </div>
      <div className="filter-item">
        <label>Religion</label>
        <select required onChange={handleFilterChange("religion")}>
          <option>Select</option>
          <option value="Hindu">Hindu</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
          <option value="Sikh">Sikh</option>
          <option value="Jain">jain</option>
          <option value="Other">Other</option>
        </select>  
      </div>
      <div className="filter-item">
        <label>Mother Tongue</label>
        <select required onChange={handleFilterChange("motherTongue")}>
          <option>Select</option>
          <option value="Malayalam">Malayalam</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Telungu">Telungu</option>
          <option value="Kannada">Kannada</option>
          <option value="Other">Other</option>

        </select>  
      </div>
      <div >
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default ProfileFilter;
