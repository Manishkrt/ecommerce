import React from 'react'


// import section 
import HomeSlide from './HomeSlide'
import ProductSection from './Section/ProductSection'
import CategoryList from './Section/CategoryList'
import Marquee from './Section/Marquee'
import MobileSection from './Section/MobileSection'
import Navbar from './Navbar'
 

const Index = () => { 
  

  return (
    <div className="bg-light-dark">
      <Navbar/>
      <Marquee/>
      <HomeSlide/>
      <CategoryList/>
      {/* <MobileSection/>
      <MobileSection/>
      <MobileSection/> */}
      <MobileSection/>
      <ProductSection/>

    </div>

  )
}

export default Index