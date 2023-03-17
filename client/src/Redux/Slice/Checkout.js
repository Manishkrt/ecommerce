import { createSlice } from "@reduxjs/toolkit";

const Checkout = createSlice({
    name: 'CheckOut',
    initialState: [],
    reducers : {
        additem: (state, action)=>{
            state.push(action.payload)
        },
        removeitem: (state, action)=>{ 
            // console.log(state.length)
            let itemToBeRemoved = action.payload 
            state.splice(state.findIndex(a => a._id === itemToBeRemoved._id) , 1)
            // console.log(state.findIndex(a => a._id === itemToBeRemoved._id)) 
            // state.splice(state.findIndex(a => a._id === itemToBeRemoved.id) , 1)
        }
    }
})

export const  {additem, removeitem} = Checkout.actions
export default Checkout.reducer;