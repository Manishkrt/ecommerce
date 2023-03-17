import React, { useEffect, useState }  from 'react'
import { Link, Outlet, useNavigate  } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faRightToBracket, faDoorOpen, faHome} from '@fortawesome/free-solid-svg-icons' 
import { useSelector } from 'react-redux'


const Navbar = () => {  
  const navigate = useNavigate()
  const [auth, setAuth] = useState()
  const [product, setProduct] = useState([])
  const productdt = useSelector(store => store.product.data)
  useEffect(()=>{ 
      const aut = localStorage.getItem('sellerdata') 
        setAuth(aut)
        setProduct(productdt)
    })

  const logout = ()=>{
    if(localStorage.getItem('sellerdata')){
      localStorage.removeItem("sellerdata"); 
    } 
  }
  
  let sellerData = localStorage.getItem('sellerdata')
         sellerData = JSON.parse(sellerData) 

  return (
    <>
    
    <nav className=" shadow-sm sellernav bg-white ">
      <div className="container">
        <div className="d-flex height-60 align-items-center justify-content-between">
          <div>
            <Link to="/seller">
            <img src="../assets/img/hammer-logo.png" alt="" className="img-fluid logo"/>
            </Link>
            {/* <h3 className="cl-orange">Seller Page</h3> */}
          </div>
          <div>
            <ul className="d-flex align-items-center list-style-none">
              {auth ? 
              <div className="d-flex align-items-center list-style-none">
              {/* <li className="ms-3"><Link to="/seller">Product</Link></li>  */}
              <li className="ms-3"><Link to="/seller">Total Items <span className='bg-orange text-white p-1 rounded fw-bold'>{
                product && product.filter(val=> val.company === sellerData.company).length
              }</span></Link></li> 
              </div>
              : null}
              <li className="ms-3 hover-dropdown">
                <span className='sellerlink bg-orange d-flex align-items-center justify-content-center p-2 rounded-circle'>
                <FontAwesomeIcon className='fs-5 text-white sellericon' icon={faUser}/>
                </span>
                  <div className='hover-dropdown-item '>
                    <div className='bg-white rounded box-shadow border'>
                      {auth ?  
                      <Link  onClick={logout} to="/seller/login"> <FontAwesomeIcon className='cl-orange me-2' icon={faRightToBracket}/> Log Out</Link> :
                      <Link to="/seller/login"> <FontAwesomeIcon className='cl-orange me-2' icon={faDoorOpen}/> Log In</Link> 
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