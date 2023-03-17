import React from 'react'
import { Link, Outlet, useNavigate  } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faRightToBracket, faDoorOpen,  faHome} from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {  
  const logout = ()=>{
    if(localStorage.getItem('admindata')){
      localStorage.removeItem("admindata"); 
    } 
  } 
  const auth = localStorage.getItem('admindata')   
 

  return (
    <>
    
    <nav className=" shadow-sm sellernav bg-white ">
      <div className="container">
        <div className="d-flex height-60 align-items-center justify-content-between">
          <div>
            <img src="../assets/img/hammer-logo.png" alt="" className="img-fluid logo"/> 
          </div>
          <div>
            <ul className="d-flex align-items-center list-style-none">

             {auth ? 
              <div className='d-flex align-items-center list-style-none'>
              <li className="ms-3 ff-roboto"><Link to="/admin">Product</Link></li> 
              <li className="ms-3 ff-roboto"><Link to="/admin/company">Total Company</Link></li> 
              <li className="ms-3 ff-roboto"><Link to="/admin/category">Category</Link></li> 
              </div>  
              : null}

              <li className="ms-3 hover-dropdown">
                <span className='sellerlink bg-orange d-flex align-items-center justify-content-center p-2 rounded-circle'>
                <FontAwesomeIcon className='fs-5 text-white sellericon' icon={faUser}/>
                </span>
                  <div className='hover-dropdown-item '>
                    <div className='bg-white rounded box-shadow border'>
 
                      {auth ? <Link  onClick={logout} to="/admin/login"> <FontAwesomeIcon className='cl-orange me-2' icon={faRightToBracket}/> Log Out</Link>
                      : <Link to="/admin/login"> <FontAwesomeIcon className='cl-orange me-2' icon={faDoorOpen}/> Log In</Link>
                      } 
                      <Link onClick={logout} to="/">  <FontAwesomeIcon className='cl-orange me-2' icon={faHome}/> Go to user page</Link>
                    </div>
                  </div>
              </li>
            </ul> 
          </div>
        </div>
      </div>
    </nav> 
    <div className="height-70"></div>
    <Outlet/>
    </>
  )
}

export default Navbar