import React from "react";
import './ProfileFilter.scss';

const ProfileFilter = () => {
  return (
    <div className="profile_filter-container">
      <div className="filter-item">
        <label>I'm looking for :</label>
        <select>
          <option>Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        
      </div>
      <div className="filter-item">
        <label>Age</label>
        <input type="number" min={18}    />
      </div>
      <div className="filter-item">
        <label>Religion</label>
        <select>
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
        <select>
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
        <button>Search</button>
      </div>
    </div>
  );
};

export default ProfileFilter;
