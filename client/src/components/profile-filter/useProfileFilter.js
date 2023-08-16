import { useDispatch } from "react-redux";
import axios from "axios";
import {setFilterAppliedUserData} from '../../redux/usersSlice'
import { useState } from "react";
const useProfileFilter = () => {

    const  dispatch = useDispatch();
    const handleSubmit = (event) => {
      event.preventDefault(); 
      handleFilterSearch();  
    };
    
    const [filters, setFilters] = useState({
      gender: "",
      age: 18,
      religion: "",
      motherTongue: "",
    });
       
    const handleFilterChange = (filterKey) => (event) => {
      setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: event.target.value }));
    };
      
    const handleFilterSearch = () => {
      console.log(filters);
      axios.get('http://localhost:9000/api/filterAppliedUsers', {params:filters})
        .then(response => {
          const filterAppliedUsers = response.data;
          console.log(filterAppliedUsers,'filterappliedbyusers')
          dispatch(setFilterAppliedUserData(filterAppliedUsers));
        })
        .catch(error => {
          console.error("Error:", error);
        });
    };
      
  return {handleFilterChange,handleSubmit}
}

export default useProfileFilter
