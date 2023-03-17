import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AsideNav = () => {
  const [name, setName] = useState()
  let sellerData = localStorage.getItem('sellerdata')
      sellerData = JSON.parse(sellerData)  

  useEffect(()=>{
    setName(sellerData) 
  }, [])
  return (
    <>
        <aside className='sellerproductaside bg-light-blue'>
          <div>
            <div className='text-white'> 
              <div className="h3 fw-bold mb-5 ff-roboto border-bottom text-center text-break">{ name && name.name}</div>
              <div className='seller-aside-nav-link'>
                <Link to="/seller" className='fs-20 fw-bold pb-1 mb-2 d-block  active-link'>All Product</Link>
                <Link to="/seller/addproduct" className='fs-20 fw-bold pb-1 mb-2 d-block  '> Add Product</Link>
                <Link to="/seller/about" className='fs-20 fw-bold pb-1 mb-2 d-block  '>About</Link>
                <Link className='fs-20 fw-bold pb-1 mb-2 d-block  '>Product</Link>
              </div>
            </div>
          </div>
        </aside>
    </>
  )
}

export default AsideNav