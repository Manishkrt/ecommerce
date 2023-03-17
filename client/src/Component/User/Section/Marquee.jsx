import React from 'react'
import Marquee from "react-fast-marquee";

const MarqueeBox = () => {
  return (
    <>
    <section className='py-1 bg-orange'> 
            <Marquee className=" text-white" behavior="slide" speed={100} >
                <p className='fw-bold text-capitalize'>Special offers will be 24 March 2023 to 08 April 2013</p> 
            </Marquee> 
    </section>
    </>
  )
}

export default MarqueeBox