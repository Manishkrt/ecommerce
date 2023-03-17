import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import banner1 from '../../img/banner1.webp'
import banner2 from '../../img/banner2.webp'

const HomeSlide = () => {
  return (
    <>
    <section className="baner-slide-box p-2 bg-light">
        <div className="">
            <Carousel fade >
                <Carousel.Item>
                <img className="d-block w-100" src={banner1} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                <img className="d-block w-100" src={banner2} alt="First slide" />
                </Carousel.Item> 
            </Carousel>
        </div>
    </section>
    </>
  )
}

export default HomeSlide