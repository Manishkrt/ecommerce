import {configureStore} from '@reduxjs/toolkit'
import CategorySlice from './Slice/Category'
import ProductSlice from './Slice/Product'
import SellerSlice from './Slice/Seller'
import CartSlice from './Slice/Cart'
import CheckoutSlice from './Slice/Checkout'

export  const store = configureStore({
    reducer : {
        "category" : CategorySlice, 
        "product" : ProductSlice,
        "seller" : SellerSlice,
        "cart" : CartSlice,
        "checkout" : CheckoutSlice
    }
})
