import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from './Navbar'
import AsideNav from './AsideNav'

const AddProduct = () => {
    const navigate = useNavigate()
    
    const categoryData = useSelector(store => store.category.data)
    const [formValue, setFormValue] = useState({})
    const [sellerId, setSellerId] = useState()
    const [company, setComapany] = useState() 
    const [image, setImage] = useState()
    const [err, setErr] = useState("")
    // const navigate = useNavigate()

    const formHandle = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setFormValue({...formValue, [name]:value})
    }
    const submit = async(e)=>{
        e.preventDefault()
        const {product_name, category, price, offer, replacement, warranty, product_detail} = formValue 
        
        // console.log(product_name, category, price, offer, replacement, warranty, product_detail, image, company, sellerId)
        try{
            if(product_name && category && price && offer && replacement && warranty && product_detail && image && company && sellerId){
                setErr("")
                const formData = new FormData()
                formData.append("image", image)
                formData.append("company", company)
                formData.append("seller_id", sellerId)
                formData.append("product_name", product_name)
                formData.append("category", category)
                formData.append("price", price)
                formData.append("offer", offer)
                formData.append("replacement", replacement)
                formData.append("warranty", warranty)
                formData.append("product_detail", product_detail)

                await axios.post(`${process.env.REACT_APP_URL}/product`, formData) 
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product Add Successfully',
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    navigate('/seller')
                }) 
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Something went wrong',
                    showConfirmButton: false,
                    timer: 1500
                })
                setErr("All Fields are required")
            }
            
        } catch(e){
            console.log("Error posting");
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    const seller = ()=>{
        let sellerData = localStorage.getItem('sellerdata')
         sellerData = JSON.parse(sellerData) 
        setSellerId(sellerData._id)
        setComapany(sellerData.company)
    }

    const auth = localStorage.getItem('sellerdata')
    useEffect(()=>{ 
        if(!auth){
            navigate("/seller/login")
        }
        else{
            seller()
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
        <h1 className='h2 text-center cl-navy-blue'>Add New Product</h1>
        <div>
            <div className="container">
                <div className='shadow border rounded  p-3'>
                    <form action="">
                        <div className="row">

                            <div className="col-lg-6 col-md-6">
                                <div>
                                    <p className='text-danger'>{err}</p>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="cl-navy-blue fw-bold" htmlFor="">Product name</label>
                                    <input type="text" name="product_name" className='form-control' id="" onChange={formHandle}/>
                                </div> 
                                <div className="form-group mb-3">
                                    <label className="cl-navy-blue fw-bold" htmlFor="">Product image</label>
                                    <input type="file" name="image" className='form-control' id="" onChange={(e)=>{setImage(e.target.files[0])}}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="cl-navy-blue fw-bold" htmlFor="">Product price</label>
                                    <input type="text" name="price" className='form-control' id="" onChange={formHandle}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="cl-navy-blue fw-bold" htmlFor="">Discount offer</label>
                                    <input type="number" name="offer" className='form-control' id="" onChange={formHandle}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="cl-navy-blue fw-bold" htmlFor="">Category </label>
                                    <select name="category" id="" className='form-select' onChange={formHandle} defaultValue={""}>
                                        <option value="" disabled >Choose Category</option>
                                        {categoryData && categoryData.map((value, i)=>{
                                            return(
                                                <option key={i} value={value.name}>{value.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div> 

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group mb-3">
                                    <label className="cl-navy-blue fw-bold" htmlFor="">Replacement</label> 
                                    <select name="replacement" id="" className='form-select' onChange={formHandle} >
                                        <option value="0">No Replacement</option>
                                        <option value="1">1 Day Replacement</option>
                                        <option value="2">2 Day Replacement</option>
                                        <option value="3">3 Day Replacement</option>
                                        <option value="4">4 Day Replacement</option>
                                        <option value="5">5 Day Replacement</option>
                                        <option value="6">6 Day Replacement</option>
                                        <option value="7">7 Day Replacement</option> 
                                    </select>
                                </div> 
                                <div className="form-group mb-3">
                                    <label className="cl-navy-blue fw-bold" htmlFor="">Warranty</label> 
                                    <select name="warranty" id="" className='form-select' onChange={formHandle} >
                                        <option value="0">No Warranty</option>
                                        <option value="1">1 year Warranty</option>
                                        <option value="2">2 year Warranty</option>
                                    </select>
                                </div> 
                                
                                <div className="form-group mb-3">
                                    <label className="cl-navy-blue fw-bold" htmlFor="">Product details</label> 
                                    <textarea name="product_detail" placeholder='fill product details' className='form-control' id="" rows="7" onChange={formHandle} ></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <button  className='btn form-control fs-20 text-white fw-bold bg-orange' onClick={submit}  >Submit</button>
                                </div>
                            </div>


                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
    </div>
    </div>
    : null}
    </>
  )
}

export default AddProduct