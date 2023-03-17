import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart, faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons"
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import {remove} from '../../Redux/Slice/Cart'
import {removeitem} from '../../Redux/Slice/Checkout'
import {additem} from '../../Redux/Slice/Checkout'
import Navbar from './Navbar'
 

const Cart = () => {
  const cartdata = useSelector(store => store.cart) 
  const checkoutdata = useSelector(store => store.checkout) 
  const dispatch = useDispatch()

  const [totalPrice, setTotalPrice] = useState("")
  const [discountPrice, setDiscountPrice] = useState("")
  const [finalPrice, setFinalPrice] = useState("")

  const totalP = ()=>{
    const price = checkoutdata.reduce((acc, curv, i)=>{
      let total = acc + parseInt(curv.price)
      return (total)
    }, 0)
    setTotalPrice(price) 
  } 
  const discountP = ()=>{
    const discount = checkoutdata.reduce((acc, curv, i)=>{
      let total = acc + Math.trunc(parseInt(curv.price)* (parseInt(curv.offer)/100))
      return (total)
    }, 0)
    setDiscountPrice(discount) 
  }
  const totoalDiscountP = ()=>{
    const finalP = checkoutdata.reduce((acc, curv, i)=>{
      let total = acc + Math.trunc(parseInt(curv.price) - (parseInt(curv.price)* (parseInt(curv.offer)/100)))
      return (total)
    }, 0)
    setFinalPrice(finalP) 
  }

  useEffect(()=>{
    totalP()
    discountP()
    totoalDiscountP()
  })
  const auth = localStorage.getItem('userdata')
  const navigate = useNavigate()
  useEffect(()=>{
    if(!auth){
      navigate('/login')
    }
  })

  return (
    <>
    <Navbar/>
    {
      cartdata.length > 0 ? 
    
    <main className='bg-light-dark py-3 min-vh-100'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <div className='bg-white p-3 mb-3'>
                <div>
                  <div className="card mb-2 px-3">
                  {
                    cartdata && cartdata.map((cv, i)=>{
                      return(
                        <div className="row py-3" key={i}>
                          <div className="col-lg-2 col-md-4 col-sm-5">
                            <div>
                              <Link to={`/${cv._id}`}>
                                <img src={`${process.env.REACT_APP_URL}/${cv.image}`} className="img-fluid" alt="" />
                              </Link>
                            </div>
                          </div>
                          <div className="col-lg-9 col-md-8 col-sm-5"> 
                              <div>
                                <Link to={`/${cv._id}`}>
                                  <p className='fw-bolder mb-2'>{cv.product_name}</p>
                                </Link>
                                <div>
                                  <h4 className='ff-roboto mb-3'> <FontAwesomeIcon className='m-0 pe-2 text-sucess h4' icon={faIndianRupeeSign}/> 
                                      <span className=' me-2 ff-roboto'>
                                        {
                                          (()=>{
                                            let price = Math.trunc(cv.price * ((100 - cv.offer)/100));
                                            let pricestr = price.toString()
                                            let pricelen = pricestr.length 
                                            if(pricelen > 3){ 
                                                let price2 = pricestr.slice((pricelen - 3), pricelen)
                                                let price1 = pricestr.slice(0, (pricelen - 3)) 
                                                pricestr = price1.concat("," , price2)
                                            }
                                            return pricestr
                                        })()
                                        }
                                      </span>
                                      <span className='text-decoration-line-through h6 fw-bolder text-muted me-2'>{cv.price}</span> 
                                      <span className='h5 text-primary'>{cv.offer}% off</span>
                                  </h4> 
                                </div>
                                <div className='d-flex align-items-center'>
                                  <div className='d-flex me-3 width-100 align-items-center justify-content-between'>
                                    {
                                      (()=>{
                                        if((checkoutdata.filter(data=> data._id === cv._id).length) > 1){
                                          return (
                                            <button className='nobtn' onClick={()=>{dispatch(removeitem(cv))}} >-</button>
                                          )
                                        }else{
                                          return (
                                            <button className='nobtn' onClick={()=>{dispatch(remove(i)); dispatch(removeitem(cv))}} >-</button>
                                          )
                                        }
                                      })()
                                    }
                                    {/* <button className='nobtn' onClick={()=>{dispatch(removeitem(cv))}} >-</button>  */}
                                    <span className='fw-bold m-0'>
                                      { 
                                        checkoutdata.filter(data=> data._id === cv._id).length
                                      }
                                    </span> 
                                    <button className='nobtn' onClick={()=>{dispatch(additem(cv))}}>+</button>
                                  </div>
                                  <div>
                                    <button  className='border-0 bg-white m-0 text-danger h5'>Remove</button>
                                  </div> 
                                </div> 
                              </div> 
                          </div>
                      </div>
                      )
                    })
                  }
                      


                  </div> 
                </div> 
            </div>
            
          </div>
          <div className="col-lg-4 col-md-4">
            <div className='bg-white p-3'>
               <div className='border-bottom pb-3'>
                <h3 className='ff-roboto'>Price details</h3>
               </div>
               <div className='border-bottom pt-3'>
                  <div className="d-flex justify-content-between pb-2">
                    <p>Price ({checkoutdata.length} item)</p>
                    <p>₹ {totalPrice}</p>
                  </div>
                  <div className="d-flex justify-content-between pb-2">
                    <p>Discount</p>
                    <p className='cl-orange'> − ₹ {discountPrice}</p>
                  </div>
                  <div className="d-flex justify-content-between pb-2">
                    <p>Delivery Charges</p>
                    <p className='cl-orange'>Free</p>
                  </div>
               </div>
               <div className='border-bottom  py-2'>
                  <div className="d-flex justify-content-between">
                    <p>Total Amount</p>
                    <p>₹ {finalPrice}</p>
                  </div>
               </div>
               <div className='pt-3'>
                  <p className='fw-bolder text-success'>You will save ₹{discountPrice} on this order</p>
                  <div className='text-end pt-2'>
                    <Link className='btn btn-orange fw-bolder display-2 d-inline-block '>
                      <FontAwesomeIcon  icon={faHandHoldingHeart}/> Place Order
                    </Link>
                  </div>
                  
               </div>

            </div>
          </div>
        </div>
      </div>
    </main>
    : 
    <div className='h-50'>
      <div className='d-flex align-items-center justify-content-center h-100'>
                <h1>Cart is empty</h1>
      </div>
    </div>
    }
    </>
  )
}

export default Cart