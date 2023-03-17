import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faUser, faRightToBracket, faDoorOpen, faHome, faSearch} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'


const Navbar = () => {

  const logout = ()=>{
    if(localStorage.getItem('userdata')){
      localStorage.removeItem("userdata"); 
    } 
  }

  const cartdata = useSelector(store => store.cart)
  
  const auth = localStorage.getItem('userdata') 
  let userName =   JSON.parse(auth) 
  return (
    <>
    <nav className="bg-white sellernav shadow-sm ">
      <div className="container">
        <div className="d-flex height-70 align-items-center justify-content-between">
          <div>
            <Link to="/">
            <img src="../assets/img/hammer-logo.png" alt="" className="img-fluid logo"/>
            </Link>
          </div>
          <div>
            <ul className="d-flex align-items-center ff-roboto list-style-none"> 
            {auth ? 
              <li className="ms-3">
                <div className='border  border-dark py-1 px-2 w-250'>
                <form action="" className='d-flex align-items-center'>
                  <input type="text" name="" id="" className='border-0 fs-14 w-100' placeholder='Search for products & brands'/>
                  <FontAwesomeIcon  icon={faSearch}/>
                </form>
                </div>
              </li>
              : null}
              <li className="ms-3"><Link to="/seller/login">become a seller</Link></li> 
              {auth ?
              <li className="ms-3"><Link to="/cart"> <span className='position-relative'> 
              <FontAwesomeIcon className='text-muted' icon={faCartShopping}/>  
              <span className='position-absolute ff-roboto cart-num'>
                {cartdata && cartdata.length ? cartdata.length : null}
              </span>
              </span> Cart</Link></li> : null}
              <li className="ms-3 hover-dropdown">
                <span className='sellerlink bg-orange d-flex align-items-center justify-content-center p-2 rounded-circle'>
                <FontAwesomeIcon className='fs-5 text-white sellericon' icon={faUser}/>
                {/* <h5 className='text-white'>M</h5> */}
                </span>
                  <div className='hover-dropdown-item '>
                    <div className='bg-white rounded box-shadow border'>
                      {auth ? <>
                      <Link to="/"> <FontAwesomeIcon className='cl-orange me-2' icon={faUser}/> {userName.name}</Link>
                      <Link  onClick={logout} to="/login"> <FontAwesomeIcon className='cl-orange me-2' icon={faRightToBracket}/> Log Out</Link> </> :
                      <Link to="/login"> <FontAwesomeIcon className='cl-orange me-2' icon={faDoorOpen}/> Log In</Link> }
                      <Link onClick={logout} to="/admin">  <FontAwesomeIcon className='cl-orange me-2' icon={faHome}/> Admin</Link>
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