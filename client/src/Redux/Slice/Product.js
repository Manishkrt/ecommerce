import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const productdata =  createAsyncThunk('productdata', async ()=>{
    let response = await axios.get(`${process.env.REACT_APP_URL}/product`).then(data => data.data)
     return response 
  })

const ProductSlice = createSlice({
    name: "product data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (prod)=>{
        prod.addCase(productdata.pending, (state,action)=>{
          state.isLoading = true;
        })
    
      prod.addCase(productdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      prod.addCase(productdata.rejected, (state,action)=>{
        console.log('Error',action.payload);
        state.isError=true;
      })
    }
})
 
// export const {addproduct} = ProductSlice.actions
export default ProductSlice.reducer;


 



