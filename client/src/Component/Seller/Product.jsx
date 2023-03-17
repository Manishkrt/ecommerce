import React, { useEffect, useState } from 'react' 
import { Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Swal from 'sweetalert2' 

const Product = () => {
    const [product, setProduct] = useState() 

   
    
    const getProduct = async()=>{
        let data = await axios.get(`${process.env.REACT_APP_URL}/product`)
        data = data.data
        setProduct(data) 
    }
    const deleteProduct = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete(`${process.env.REACT_APP_URL}/product/${id}` )
                await Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Item Delete Successfully',
                    showConfirmButton: false,
                    timer: 1000
                })
                getProduct() 
            }
        })
         
    }
    useEffect(()=>{
        getProduct()
    }, [])

    let sellerData = localStorage.getItem('sellerdata')
         sellerData = JSON.parse(sellerData) 
  return (
    <>
    <div className=' py-3'>
        <div className="seller-produs-page-header border border-2 border-light-blue rounded shadow-sm d-flex justify-content-end h-100 py-2 px-3 bg-light">
            <div className="seller-product-search border border-light-blue rounded bg-white ">
                <input type="text" className='' name="" id="" />
                <span><FontAwesomeIcon icon={faSearch}/></span>
            </div>
            <Link className='btn bg-light-blue text-white fw-bold ms-3' to="/seller/addproduct">Add Product</Link>
        </div> 
    </div>
    <div>
        <table className='table rounded table-hover table-striped table-bordered  table-responsive'>
            <thead className='cl-navy-blu text-center rounded text-white bg-navy-blue '>
                <tr>
                    <th>S. No. </th>
                    <th>Product </th>
                    <th>Product Name </th>
                    <th>Price (Rs.)</th>
                    <th>Category</th>
                    <th>Company </th>
                    <th>Offer (%)</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className='text-center'> 
                {product && product.filter(value => value.company === sellerData.company).map((value, i)=>{
                    return(
                    <tr key={i}> 
                        <td>{i+1}</td>
                        <td>
                            <img src={`${process.env.REACT_APP_URL}/${value.image}`} alt="" style={{width: "100px"}}/>
                        </td>
                        <td>{value.product_name}</td>
                        <td>{value.price}</td>
                        <td>{value.category}</td>
                        <td>{value.company}</td>
                        <td>{value.offer}</td> 
                        <td>
                            <Link to={`/seller/editproduct/${value._id}`} className='btn btn-sm mx-2 fw-bold mb-1 btn-success'>Edit</Link>
                            <Link  onClick={()=>{deleteProduct(value._id)}} value={value._id} className='btn btn-sm mx-2 fw-bold mb-1 btn-danger'>Delete</Link>
                            <Link className='btn btn-sm mx-2 fw-bold mb-1 btn-primary'>View</Link>
                        </td> 
                    </tr>
                    ) 
                })}
                
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Product