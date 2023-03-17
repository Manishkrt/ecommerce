import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import { useEffect } from 'react';

// redux 
import {useDispatch} from 'react-redux'
import {categorydata} from './Redux/Slice/Category' 
import {productdata} from './Redux/Slice/Product'  
import { sellerdata } from './Redux/Slice/Seller'



// seller component get 
import NavbarSeller from './Component/Seller/Navbar'
import IndexSeller from './Component/Seller/Index';
import SignUpSeller from './Component/Seller/SignUp';
import LogInSeller from './Component/Seller/LogIn'; 
import AddProduct from './Component/Seller/AddProduct';
import EditProduct from './Component/Seller/EditProduct';
import About from './Component/Seller/About';

// user component get 
import NavbarUser from './Component/User/Navbar'
import IndexUser from './Component/User/Index'; 
import ViewProduct from './Component/User/Section/ViewProduct';
import Cart from './Component/User/Cart';
import LogIn from './Component/User/LogIn';
import SignUp from './Component/User/SignUp';
import Category from './Component/User/Category'; 


import NavbarAdmin from './Component/Admin/Navbar';
import AddCategory from './Component/Admin/AddCategory';
import LogInAdmin from './Component/Admin/LogIn';
import Index from './Component/Admin/Index';
import CompanyView from './Component/Admin/CompanyView';
import CategoryView from './Component/Admin/CategoryView';
import PrivateAdmin from './Component/Admin/Private';
import PrivateSeller from './Component/Seller/Private';
import PrivateUser from './Component/User/Private';




function App() {
  const dispatch = useDispatch() 

  useEffect(()=>{
    dispatch(categorydata())  
    dispatch(productdata())
    dispatch(sellerdata())
  }, []) 



  return (
    <>

    <BrowserRouter> 
    <Routes>  
        {/* <Route path="/" element={<NavbarUser/>} > */}
        <Route path="/" element={<PrivateUser/>} >
          <Route index element={<IndexUser/>} />
          <Route path="login" element={<LogIn/>} />
          <Route path="signup" element={<SignUp/>} />
          {/* <Route path="view-product" element={<ViewProduct/>} /> */}
          <Route path="cart" element={<Cart/>} /> 
          <Route path="/:category/:id" element={<ViewProduct/>} /> 
          <Route path="/categories/:category" element={<Category/>} /> 

        </Route> 

        <Route path="/seller" element={<PrivateSeller/>} >
          <Route index element={<IndexSeller/>} />
          <Route path="signup" element={<SignUpSeller/>} />
          <Route path="login" element={<LogInSeller/>} />
          <Route path="addproduct" element={<AddProduct/>} />
          <Route path="editproduct/:id" element={<EditProduct/>} />
          <Route path="about" element={<About/>} /> 
        </Route> 

        {/* <Route path="/admin" element={<NavbarAdmin/>} >  */}
        <Route path="/admin" element={<PrivateAdmin/>} > 
          <Route index element={<Index/>} />
          <Route path="login" element={<LogInAdmin/>} />
          <Route path="addcategory" element={<AddCategory/>} />
          <Route path="company" element={<CompanyView/>} />
          <Route path="category" element={<CategoryView/>} />
        </Route> 
      </Routes>
    </BrowserRouter>  
    </>
  );
}

export default App;
