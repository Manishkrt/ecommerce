import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from './Navbar'
import AsideNav from './AsideNav'

const EditProduct = () => {
    const categoryData = useSelector(store => store.category.data) 
    const [image, setImage] = useState()
    const [err, setErr] = useState("")
    const navigate = useNavigate()
    const  productId  = useParams(); 

    // form name state 
    const [productName, setProductName] = useState("") 
    const [productPrice, setProductPrice] = useState("") 
    const [productOffer, setProductOffer] = useState("") 
    const [productCategory, setProductCategory] = useState("") 
    const [productReplacement, setProductReplacement] = useState("") 
    const [productWarranty, setProductWarranty] = useState("") 
    const [productDetail, setProductDetail] = useState("") 
    const [productCompany, setProductCompany] = useState("") 
    const [productSellerId, setProductSellerId] = useState("") 
    const [productImagePath, setProductImagePath] = useState("") 

 
    const submit = async (e)=>{
        e.preventDefault() 
        try{
            if(productName && productPrice && productOffer && productCategory && productReplacement && productWarranty && productDetail && productCompany && productSellerId && productImagePath){ 
                setErr("")
                const formData = new FormData()
                formData.append("product_name", productName )
                formData.append("category", productCategory)
                formData.append("price", productPrice)
                formData.append("offer", productOffer)
                formData.append("replacement", productReplacement)
                formData.append("warranty", productWarranty)
                formData.append("product_detail", productDetail)
                formData.append("company", productCompany)
                formData.append("seller_id", productSellerId)

                image ?  formData.append("image", image) :
                formData.append("image", productImagePath)
               
                await axios.post(`${process.env.REACT_APP_URL}/product/${ productId.id }`, formData)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product Update Successfully',
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    navigate('/seller')
                }) 

            }
            else{
                setErr("All field are required")
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'All field are required',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }catch(err){
            console.log("error", err)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }



    const findProduct = async()=>{
        try{
            let data = await axios.get(`${process.env.REACT_APP_URL}/product/${productId.id}`)
            data = data.data 
            setProductName(data.product_name) 
            setProductPrice(data.price)
            setProductOffer(data.offer)
            setProductCategory(data.category)
            setProductReplacement(data.replacement)
            setProductWarranty(data.warranty)
            setProductDetail(data.product_detail)
            setProductCompany(data.company)
            setProductSellerId(data.seller_id)
            setProductImagePath(data.image)

        }
        catch(err){
            console.log(err)
        }
    }
 

    useEffect(()=>{
        findProduct() 
    },[]) 
  const auth = localStorage.getItem('sellerdata')
    useEffect(()=>{ 
        if(!auth){
            navigate("/seller/login")
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
    <h1 className='h2 text-center cl-navy-blue'>Update Product</h1>
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
                                <input type="text" name="Product_name" className='form-control' value={productName && productName} onChange={(e)=>{setProductName(e.target.value)}} /> 
                            </div> 
                            <div className="form-group mb-3">
                                <label className="cl-navy-blue fw-bold" htmlFor="">Product image</label>
                                <input type="file" name="image" className='form-control' id="" onChange={(e)=>{setImage(e.target.files[0])}}/>
                            </div>
                            <div>
                                <img src={`${process.env.REACT_APP_URL}/${productImagePath}`} alt="" style={{width: "100px"}} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="cl-navy-blue fw-bold" htmlFor="">Product price</label>
                                <input type="text" name="price" className='form-control' value={productPrice && productPrice} onChange={(e)=>{setProductPrice(e.target.value)}}/>
                            </div>
                            <div className="form-group mb-3">
                                <label className="cl-navy-blue fw-bold" htmlFor="">Discount offer</label>
                                <input type="number" name="offer" className='form-control' value={productOffer && productOffer} onChange={(e)=>{setProductOffer(e.target.value)}}/>
                            </div>
                            <div className="form-group mb-3">
                                <label className="cl-navy-blue fw-bold" htmlFor="">Category </label>
                                <select name="category" id="" className='form-select' defaultValue ={productCategory && productCategory} onChange={(e)=>{setProductCategory(e.target.value)}} >
                                    <option value={productCategory && productCategory} disabled >{productCategory && productCategory}</option>
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
                                <select name="replacement" id="" className='form-select' defaultValue ={productReplacement && productReplacement} onChange={(e)=>{setProductReplacement(e.target.value)}} >
                                    <option value={productReplacement && productReplacement}> {productReplacement && productReplacement} Day Replacement</option>
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
                                <select name="warranty" id="" className='form-select' defaultValue ={productWarranty && productWarranty} onChange={(e)=>{setProductWarranty(e.target.value)}} >
                                    <option value={productWarranty && productWarranty}> {productWarranty && productWarranty} year Warranty </option>
                                    <option value="0">No Warranty</option>
                                    <option value="1">1 year Warranty</option>
                                    <option value="2">2 year Warranty</option>
                                </select>
                            </div> 
                            
                            <div className="form-group mb-3">
                                <label className="cl-navy-blue fw-bold" htmlFor="">Product details</label> 
                                <textarea name="product_detail" placeholder='fill product details' className='form-control' id="" rows="7" defaultValue ={productDetail} onChange={(e)=>{setProductDetail(e.target.value)}} ></textarea>
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
    </main></div> 
    </div>
    : null}
    </>
  )
}
 
export default EditProduct