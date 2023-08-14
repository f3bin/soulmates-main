import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
     users: [],
     profileData: [],
     status: 'idle', 
     loading: false, 
     error: null,   
   };
   

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    
     try {
          const response = await axios.get('http://localhost:9000/api/users');
      
          return response.data.users;
     } catch (error) {
          console.error(error);
          throw error;   
     }
});

export const fetchUserProfiles = createAsyncThunk('users/fetchUserProfiles', async () => {
     try {
          const response = await axios.get('http://localhost:9000/api/profileDatas');
          return response.data.profiles
     } catch (error) {
          console.log(error);
          throw error;
     }
});

const usersSlice = createSlice({
     name: "users",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
            .addCase(fetchUsers.pending, (state) => {
              state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
              state.status = "succeeded";
              state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message;
            })
            .addCase(fetchUserProfiles.pending, (state) => {
              state.status = "loading";
            })
            .addCase(fetchUserProfiles.fulfilled, (state, action) => {
              state.status = "succeeded";
              state.profileData = action.payload;
            })
            .addCase(fetchUserProfiles.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message;
            });
        }
})

export default usersSlice.reducer;