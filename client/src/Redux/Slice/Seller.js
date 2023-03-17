import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const sellerdata =  createAsyncThunk('sellerdata', async ()=>{
    let response = await axios.get(`${process.env.REACT_APP_URL}/seller`).then(data => data.data)
     return response 
  })

const SellerSlice = createSlice({
    name: "Seller data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(sellerdata.pending, (state,action)=>{
          state.isLoading = true;
        })
    
      builder.addCase(sellerdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(sellerdata.rejected, (state,action)=>{
        console.log('Error',action.payload);
        state.isError=true;
      })
    }
})
 
export default SellerSlice.reducer;


 



