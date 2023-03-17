import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons' 
import { useSelector } from 'react-redux';  
import Navbar from './Navbar'

const Category = () => {
    const product = useSelector(store => store.product.data);
    const params = useParams() 

  return (
    <>
    <Navbar/>
        <div className='mt-5'>
            <div className="container"> 
            <div className="row">
        {
        product && product.filter(productval => productval.category === params.category).map((val, i)=>{
            return( 
                <div className='px-2 mb-3 col-lg-2 col-md-4 col-sm-6 car' key={i} > 
                <Link className='' to={`/${val.category}/${val._id}`}>
                <div className='d-sm-block d-flex'>
                    <div className='px-sm-4 px-2'>
                        <img src={`${process.env.REACT_APP_URL}/${val.image}`} className="img-fluid img-thumbnail border-0" alt="" />
                    </div>
                    <div>
                        <div className='mt-2 text-sm-center'><p className='fw-bold item-name text-break'>{val.product_name}</p></div>
                        <div className='text-sm-center'>
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
                    </div>
                </div>
                </Link>
                </div> 
            )
        })
        } 
        </div>
        </div>
        </div>
    </>
  )
}

export default Category