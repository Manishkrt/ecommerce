import React from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons' 
import { useSelector } from 'react-redux';  

const ProductSection = () => {

    const product = useSelector(store => store.product.data);
    const category = useSelector(store => store.category.data); 

    var MobileCarousel = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows : true,
        autoplay: false, 
      };
    


  return (
    <>
       
    {
    category && category.map((categoryval, i)=>{
        return(
                
        <section className='mb-3' key={i} >
            <div className="container-fluid  ">
            <div className='bg-white slide-box'>
                
                <aside className='slide-aside'>
                <div className='text-center cl-navy-blue '>
                    <h2 className='cl-navy-blue mb-2 text-capitalize'>{categoryval.name}</h2>
                    <Link to={`/categories/${categoryval.name}`} className='btn bg-orange text-white fw-bold mb-3'>View All</Link>
                </div>
                <div>
                    <img src={`${process.env.REACT_APP_URL}/${categoryval.image}`} alt="" className='img-fluid w-100' />
                </div>
                </aside>
                <aside className='mobile-slide-wrap slide-wrap pt-4 pb-2  align-bottom'> 
                <Slider {...MobileCarousel}>
                    {
                    product && product.filter(productval => productval.category === categoryval.name).map((val, i)=>{
                        return( 
                            <div className='px-2 mb-3' key={i} >
                            {/* <Link className='' to={`/${val._id}/${(()=>{
                                let slug = val.product_name
                                slug = slug.split(' ').join('%') 
                                slug = slug.split('/').join('-') 
                                return slug
                            })()}`}> */}
                            <Link className='' to={`/${val.category}/${val._id}`}>
                            <div className='px-4'>
                                <img src={`${process.env.REACT_APP_URL}/${val.image}`} className="img-fluid img-thumbnail border-0" alt="" />
                            </div>
                            <div className='mt-2'><p className='fw-bold item-name text-break'>{val.product_name}</p></div>
                            <div>
                                <FontAwesomeIcon className='cl-orange'  icon={faIndianRupeeSign}/> <span className='cl-navy-blue fw-bold ff-roboto'> { (()=>{
                                    let price = Math.trunc(val.price * ((100 - val.offer)/100));
                                    let pricestr = price.toString()
                                    let pricelen = pricestr.length 
                                    if(pricelen > 3){ 
                                        let price2 = pricestr.slice((pricelen - 3), pricelen)
                                        let price1 = pricestr.slice(0, (pricelen - 3)) 
                                        pricestr = price1.concat("," , price2)
                                    }
                                    return pricestr
                                })()  } </span>
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
        )
    })
    }


    </>
  )
}

export default ProductSection