import React, { useEffect, useState } from 'react'
import Slider from "react-slick"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign, faTag, faDownload, faCartShopping, faArrowRight, faEye} from '@fortawesome/free-solid-svg-icons'  
import { Link, useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import {add} from '../../../Redux/Slice/Cart'
import {additem} from '../../../Redux/Slice/Checkout'
// import {useSelector} from 'react-redux'


// image import 
import mobilePhone from '../../../img/mobile.webp'
import elecSlide from '../../../img/elec-slide.webp'
import Navbar from '../Navbar';



const ViewProduct = () => {
    
    const params = useParams() 
    const productdata = useSelector(store => store.product.data); 
    const seller = useSelector(store => store.seller.data)
    const dispatch = useDispatch()
    const cartval = useSelector(store => store.cart)
    const [cartData, setCartData] = useState(false)
    const [category, setCategory] = useState()


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

      const cartcheck = ()=>{
        let value  = cartval.filter(val=> val._id === params.id); 
        if(value >= 0){ 
            setCartData(true)
        }else{
            setCartData(false)
        }
      } 
 

      useEffect(()=>{
          cartcheck()
      })  
  return (
    <>
    <Navbar/>
    <main className='bg-light-dark'>
        <section className='py-3'>
        <div className="container-fluid">
            <div className=''>
                <div className="row">
                    {/* product show aside  */}
                    { productdata && productdata.filter(val => val._id === params.id ).map((val, i)=>{ 
                    return (
                        <div className="col-lg-9 col-md-8" key={i}>
                            {/* {categ(val.category)} */}
                            <div className='bg-white h-100 p-3'>
                                <div className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <div className=''> 
                                            <div className='border p-3 rounded shadow-sm'>
                                                <img src={`${process.env.REACT_APP_URL}/${val.image}`} alt="" className='img-fluid img-thumbnail border-0' />
                                            </div>
                                            <div className='text-center my-3'>
                                                {
                                                     cartData ? 
                                                     <button className='btn btn-orange me-3 fw-bolder'  onClick={()=>{dispatch(add(val)); dispatch(additem(val)) }} >
                                                     <FontAwesomeIcon icon={faCartShopping}/> ADD TO CART</button>
                                                      : <Link to="/cart" className='btn btn-orange me-3 fw-bolder' >
                                                      <FontAwesomeIcon icon={faCartShopping}/> Go TO CART</Link>
                                                }
                                                
                                                <Link className='btn btn-outline-primary fw-bolder'>
                                                <FontAwesomeIcon icon={faDownload}/> BUY NOW</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-8">
                                        <div>
                                            <div className=''>
                                                <p className='h5 fw-normal'>{val.product_name}</p>
                                                <small className='mb-1 fw-bolder d-inline-block ff-roboto cl-orange'>Extra {val.price - Math.trunc(val.price * ((100 - val.offer)/100))} off</small>

                                                <h3 className='ff-roboto'> <FontAwesomeIcon className='me-2' icon={faIndianRupeeSign}/> 
                                                    <span className=' me-2 ff-roboto'>{(()=>{
                                                        let price = Math.trunc(val.price * ((100 - val.offer)/100));
                                                        let pricestr = price.toString()
                                                        let pricelen = pricestr.length 
                                                        if(pricelen > 3){ 
                                                            let price2 = pricestr.slice((pricelen - 3), pricelen)
                                                            let price1 = pricestr.slice(0, (pricelen - 3)) 
                                                            pricestr = price1.concat("," , price2)
                                                        }
                                                        return pricestr
                                                    })()}</span>
                                                    <span className='text-decoration-line-through h5 fw-bolder text-muted me-2'>{val.price}</span> 
                                                    <span className='h4 text-primary'>{val.offer}% off</span>
                                                </h3>
                                                
                                                <div className='bank-offer-box my-3'>
                                                    <h5 className='mb-2'>Available Offers</h5>
                                                    <ul className='list-group list-group-flush'>
                                                        <li className='list-group-item border-0 p-0 d-flex align-items-start'>
                                                            <FontAwesomeIcon className='pt-1 me-1 cl-orange' icon={faTag}/>
                                                            Bank Offer 10% off on Samsung axis Bank credit card
                                                        </li>
                                                        <li className='list-group-item border-0 p-0 d-flex align-items-start'>
                                                            <FontAwesomeIcon className='pt-1 me-1 cl-orange' icon={faTag}/>
                                                            Bank Offer 10% off on HSBC Bank Credit Card and EMI Transactions, up to ₹1,000. On orders of ₹5,000 and above
                                                        </li>
                                                        <li className='list-group-item border-0 p-0 d-flex align-items-start'>
                                                            <FontAwesomeIcon className='pt-1 me-1 cl-orange' icon={faTag}/>
                                                            Bank Offer 10% off on IndusInd Bank Credit Card EMI Transactions, up to ₹1000. On orders of ₹7,500 and above
                                                        </li>
                                                        <li className='list-group-item border-0 p-0 d-flex align-items-start'>
                                                            <FontAwesomeIcon className='pt-1 me-1 cl-orange' icon={faTag}/>
                                                            Special PriceGet extra ₹3000 off (price inclusive of cashback/coupon)
                                                        </li>

                                                    </ul>
                                                </div>
                                                <div className='d-flex'>
                                                    <p className='me-4 ff-roboto fw-bold text-primar h5'>Seller</p>
                                                    <div>
                                                        <p className='fw-bold ff-roboto cl-navy-blue text-uppercase'>{
                                                            seller && seller.filter(sel=> sel._id === val.seller_id).map((val)=>{
                                                                return val.name
                                                            })
                                                        }</p>
                                                        <small className='text-muted d-block'>{val.replacement} Days Replacement Policy</small>
                                                        <small className='text-muted d-block'>GST invoice available</small>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    {/* product description   */}
                                    <div className="col-12">
                                        <div className='d-flex align-items-start my-3'>
                                            <span className='border shadow-sm rounded text-success fw-bold me-2 py-1 px-2 ff-roboto text-uppercase'>{val.company}</span>
                                            <p className='pt-1'>1 Year Warranty Provided By the Manufacturer from Date of Purchase  <span className='text-primary fw-bolder'>Know More</span></p>
                                        </div>
                                        <div className='mb-3'>
                                            <h4 className='ff-roboto mb-2'>Product Description</h4>
                                            <p>{val.product_detail}</p>
                                        </div>
                                        <div className='mb-3'>
                                            <h5 className='ff-roboto mb-2'>Key features</h5>
                                            <ul className='list-style-non'>
                                                <li className='d-flex'><FontAwesomeIcon className='pt-1 text-muted me-2 ' icon={faArrowRight}/><p>4 GB RAM | 64 GB ROM | Expandable Upto 1 TB</p></li>
                                                <li className='d-flex'><FontAwesomeIcon className='pt-1 text-muted me-2 ' icon={faArrowRight}/><p>16.76 cm (6.6 inch) Full HD+ Display</p></li>
                                                <li className='d-flex'><FontAwesomeIcon className='pt-1 text-muted me-2 ' icon={faArrowRight}/><p>50MP + 5MP + 2MP | 8MP Front Camera</p></li>
                                                <li className='d-flex'><FontAwesomeIcon className='pt-1 text-muted me-2 ' icon={faArrowRight}/><p>6000 mAh Lithium Ion Battery</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                    }

                    {/* aside section  */}
                    <div className="col-lg-3 col-md-4">
                        <div className='p-3 h-100 bg-white'>
                            <div className='border-bottom pb-2'>
                                <h4 className='ff-roboto cl-navy-blue'>Similar Products</h4>
                            </div>  
                            {  (()=>{
                                let data = productdata.filter(val => val.category === params.category) 
                                data = data.slice(0, 3) 
                               return data.map((val, i)=>{
                                    return (  
                                <div key={i}>
                                    <div className="card border-0">
                                        <div className="px-4 py-2">
                                            <img src={`${process.env.REACT_APP_URL}/${val.image}`} alt="" className='img-fluid w-50 d-block  m-auto img-thumbnail border-0'/>
                                        </div>
                                        <div className='px-3 pb-3'>
                                            <p className='item-name mb-2'>{val.product_name}</p>
                                            <div className='text-center'> 
                                            {
                                                    (cartval.find(a => a._id === val._id)) ? 
                                                    <Link to="/cart" className='btn btn-orange me-3 fw-bolder' >
                                                    <FontAwesomeIcon icon={faCartShopping}/> Go TO CART</Link>
                                                    : <button className='btn btn-orange me-3 fw-bolder'  onClick={()=>{dispatch(add(val)); dispatch(additem(val)) }} >
                                                    <FontAwesomeIcon icon={faCartShopping}/> ADD TO CART</button> 
                                                } 
                                                <Link className='btn btn-outline-primary fw-bolder' to={`/${val.category}/${val._id}`}>
                                                <FontAwesomeIcon icon={faEye}/> View </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                                ) }) })()}

                            {/* <div>
                                <div className="card border-0">
                                    <div className="px-4 py-2">
                                        <img src={mobilePhone} alt="" className='img-fluid w-50 d-block  m-auto img-thumbnail border-0'/>
                                    </div>
                                    <div className='px-3 pb-3'>
                                        <p className='item-name mb-2'>SAMSUNG Galaxy F13 (Nightsky Green, 64 GB)  (4 GB RAM)</p>
                                        <div className='text-center'>
                                            <Link className='btn btn-orange me-3 fw-bolder'>
                                            <FontAwesomeIcon icon={faCartShopping}/> Add Cart</Link>
                                            <Link className='btn btn-outline-primary fw-bolder'>
                                            <FontAwesomeIcon icon={faEye}/> View </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card border-0">
                                    <div className="px-4 py-2">
                                        <img src={mobilePhone} alt="" className='img-fluid w-50 d-block  m-auto img-thumbnail border-0'/>
                                    </div>
                                    <div className='px-3 pb-3'>
                                        <p className='item-name mb-2'>SAMSUNG Galaxy F13 (Nightsky Green, 64 GB)  (4 GB RAM)</p>
                                        <div className='text-center'>
                                            <Link className='btn btn-orange me-3 fw-bolder'>
                                            <FontAwesomeIcon icon={faCartShopping}/> Add Cart</Link>
                                            <Link className='btn btn-outline-primary fw-bolder'>
                                            <FontAwesomeIcon icon={faEye}/> View </Link>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    </main>
    <section className='mb-3' >
        <div className="container-fluid  ">
        <div className='bg-white slide-box'>
            <aside className='slide-aside'>
            <div className='text-center cl-navy-blue '>
                <h2 className='cl-navy-blue mb-2'>Most View <br /> Products</h2>
                <Link to='/' className='btn bg-orange text-white fw-bold mb-3'>View All</Link>
            </div>
            <div>
                <img src={elecSlide} alt="" className='img-fluid w-100' />
            </div>
            </aside>
            <aside className='mobile-slide-wrap slide-wrap pt-4 pb-2  align-bottom'> 
            <Slider {...MobileCarousel}>
                {
                productdata && productdata.map((v, i)=>{
                    return( 
                        <div className='px-2 mb-3' key={i} >
                        <Link className='' to={`/${v.category}/${v._id}`}>
                        <div className='px-4'>
                            <img src={`${process.env.REACT_APP_URL}/${v.image}`} className="img-fluid img-thumbnail border-0" alt="" />
                        </div>
                        <div className='mt-2'><p className='fw-bold item-name text-break'>{v.product_name}</p></div>
                        <div>
                            <FontAwesomeIcon className='cl-orange'  icon={faIndianRupeeSign}/> <span className='cl-navy-blue fw-bold ff-roboto'>
                            {(()=>{
                                let price = Math.trunc(v.price * ((100 - v.offer)/100));
                                let pricestr = price.toString()
                                let pricelen = pricestr.length 
                                if(pricelen > 3){ 
                                    let price2 = pricestr.slice((pricelen - 3), pricelen)
                                    let price1 = pricestr.slice(0, (pricelen - 3)) 
                                    pricestr = price1.concat("," , price2)
                                }
                                return pricestr
                            })()}
                             </span>
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

export default ViewProduct