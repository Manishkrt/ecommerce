import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const CompanyView = () => {
 
    const navigate = useNavigate()
    const auth = localStorage.getItem('admindata')
    const product = useSelector(store => store.product.data);
    const seller = useSelector(store => store.seller.data); 

    
    useEffect(()=>{ 
        if(!auth){
            navigate("/admin/login")
        }
    })

  return (
    <> 
    <Navbar/>
    <div>
        <table className='table rounded table-hover table-striped table-bordered  table-responsive'>
            <thead className='cl-navy-blu ff-roboto text-center rounded text-white bg-navy-blue '>
                <tr>
                    <th>S. No. </th>
                    <th>Company Name </th>
                    <th>Owner Name </th>
                    <th>Email </th>
                    <th>Phone</th>
                    <th>Owner Id</th>
                    <th>Total Product </th> 
                </tr>
            </thead>
            <tbody className='text-center'> 
                {seller && seller.map((value, i)=>{
                    return(
                    <tr key={i}> 
                        <td>{i+1}</td> 
                        <td>{value.company}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.phone}</td> 
                        <td>{value._id}</td>  
                        <td>
                        { product && product.filter(productval => productval.seller_id === value._id).length }
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

export default CompanyView