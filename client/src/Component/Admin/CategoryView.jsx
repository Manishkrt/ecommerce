import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const CategoryView = () => {
 
    const category = useSelector(store => store.category.data); 

    const navigate = useNavigate()
    const auth = localStorage.getItem('admindata')
    useEffect(()=>{ 
        if(!auth){
            navigate("/admin/login")
        }
    })
  return (
    <>
    <Navbar/>
    <div className='bg-light-blue py-2'>
        <div className='text-end container'>
            <Link to="/admin/addcategory" className='btn btn-success'>Add Category</Link>
        </div>
    </div>
    <div>
        <table className='table rounded table-hover table-striped table-bordered  table-responsive'>
            <thead className='cl-navy-blu ff-roboto text-center rounded text-white bg-navy-blue '>
                <tr>
                    <th>S. No. </th>
                    <th>Category Name </th>
                    <th>Icon </th>
                    <th>Image </th>
                </tr>
            </thead>
            <tbody className='text-center'> 
                {category && category.map((value, i)=>{
                    return(
                    <tr key={i}> 
                        <td>{i+1}</td> 
                        <td>{value.name}</td>
                        <td>
                            <img src={`${process.env.REACT_APP_URL}/${value.icon}`} alt="" style={{width: "40px"}}/>
                        </td>
                        <td>
                            <img src={`${process.env.REACT_APP_URL}/${value.image}`} alt="" style={{width: "100px"}}/>
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

export default CategoryView