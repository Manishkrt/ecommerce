import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AsideNav from './AsideNav'
import Navbar from './Navbar'

const About = () => {
  const navigate = useNavigate()
  const auth = localStorage.getItem('sellerdata')
    useEffect(()=>{ 
        if(!auth){
            navigate("/seller/login")
        } 
    })
  return (
    <>
      <Navbar/>
    {auth ?
      <div className="">
        <AsideNav/>
        <main className='sellerproductmain'>
          <div>this is about page</div>
        </main>
      </div>
      : null}
    </>
  )
}

export default About