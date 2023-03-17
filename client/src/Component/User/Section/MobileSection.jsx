import React from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'  
// import image 
import mobilePhone from '../../../img/mobile.webp'
import elecSlide from '../../../img/elec-slide.webp'

const MobileSection = () => {

    var MobileCarousel = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows : true,
        autoplay: false, 
      };
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    

  return (
    <>
        <section className='mb-3' >
            <div className="container-fluid  ">
            <div className='bg-white slide-box'>
                <aside className='slide-aside'>
                <div className='text-center cl-navy-blue '>
                    <h2 className='cl-navy-blue mb-2'>Smartphones</h2>
                    <Link className='btn bg-orange text-white fw-bold mb-3'>View All</Link>
                </div>
                <div>
                    <img src={elecSlide} alt="" className='img-fluid w-100' />
                </div>
                </aside>
                <aside className='mobile-slide-wrap slide-wrap pt-4 pb-2  align-bottom'> 
                <Slider {...MobileCarousel}>
                    {
                    arr.map((v, i)=>{
                        return( 
                            <div className='px-2 mb-3' key={i} >
                            <Link className='' to="/">
                            <div className='px-4'>
                                <img src={mobilePhone} className="img-fluid img-thumbnail border-0" alt="" />
                            </div>
                            <div className='mt-2'><p className='fw-bold item-name text-break'>SAMSUNG Galaxy F13 (Nightsky Green, 64 GB)  (4 GB RAM)</p></div>
                            <div>
                                <FontAwesomeIcon className='cl-orange'  icon={faIndianRupeeSign}/> <span className='cl-navy-blue fw-bold ff-roboto'>14,785 </span>
                            </div>
                            </Link>
                            </div> 
                        )
                    })
                    } 
                </Slider>
                </aside>
            </div>
                
            </div>
        </section>
    </>
  )
}

export default MobileSection