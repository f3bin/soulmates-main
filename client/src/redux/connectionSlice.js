import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
     connections: [],
     duoConnections:[],
     status: 'idle',
     error: null,
}

export const fetchConnections = createAsyncThunk('connection/fetchConnections', async () => {
     try {
          const response = await axios.get("http://localhost:9000/api/connectionData");
          return response.data;
     } catch (error) {
          console.log(error);
          throw error;
     }
});

export const fetchDuoConnections = createAsyncThunk ('connection/fetchDuoConnections' ,async () =>{
     try {
          const response = await axios.get("http://localhost:9000/api/duoConnectionData");
          return(response.data)
     } catch (error) {
          console.log(error);
          throw error;
     }
})

const connectionSlice = createSlice({
     name: "connections",
     initialState,
     reducers: {},
     extraReducers: builder => {
          builder
               .addCase(fetchConnections.pending, state => {
                    state.status = 'loading';
               })
               .addCase(fetchConnections.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.connections = action.payload;
               })
               .addCase(fetchConnections.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
               })
               .addCase(fetchDuoConnections.pending, state => {
                    state.status = 'loading';
               })
               .addCase(fetchDuoConnections.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.duoConnections = action.payload;
               })
               .addCase(fetchDuoConnections.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
               });
     },
})

export default connectionSlice.reducer;