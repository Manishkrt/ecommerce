import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const categorydata =  createAsyncThunk('categorydata', async ()=>{
    let response = await axios.get(`${process.env.REACT_APP_URL}/category`).then(data => data.data)
     return response 
  })

const CategorySlice = createSlice({
    name: "category data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(categorydata.pending, (state,action)=>{
          state.isLoading = true;
        })
    
      builder.addCase(categorydata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(categorydata.rejected, (state,action)=>{
        console.log('Error',action.payload);
        state.isError=true;
      })
    }
})
 
export default CategorySlice.reducer;


 



