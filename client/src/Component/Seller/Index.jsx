import React, { useEffect } from 'react' 
import { useNavigate } from 'react-router-dom'

import AsideNav from './AsideNav'
import Navbar from './Navbar'
import Product from './Product'

const Index = () => {
  const navigate = useNavigate()
    const auth = localStorage.getItem('sellerdata')
    useEffect(()=>{ 
        if(!auth){
            navigate("/seller/login")
        }
    })
  return (
    <>
    {auth ? 
    <div>
    <Navbar/>
      <div className="">
        <AsideNav/>
        <main className='sellerproductmain'>
          <Product/>
        </main>
      </div>
      </div>
      : null}
    </>
    
  )
}

export default Index