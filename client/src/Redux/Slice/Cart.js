import {createSlice} from '@reduxjs/toolkit'

const CartSlice = createSlice({
    name: "CartSlices",
    initialState: [],
    reducers: {
        add: (state, action)=>{
            state.push(action.payload)
        },
        remove: (state, action)=>{
            state.splice(action.payload , 1)
        }
    }
})

export const {add, remove} = CartSlice.actions;
export default CartSlice.reducer;