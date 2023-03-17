import React, { useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const Index = () => { 
    const navigate = useNavigate()
    const product = useSelector(store => store.product.data);
    const seller = useSelector(store => store.seller.data); 
    
    useEffect(()=>{ 
        const auth = localStorage.getItem('admindata')
        if(!auth){
            navigate('/admin/login')
        }
    }, [])
  return (
    <>
    <Navbar/> 
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
                    <th>Seller</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className='text-center'> 
                {product && product.map((value, i)=>{
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
                        <td>
                        {seller.filter(seller => seller._id === value.seller_id).map((seller, i)=>{ 
                            return(
                                <span key={i} className="text-cente">{seller.name}</span>
                            ) 
                        })}
                        </td>
                        <td> 
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

export default Index