import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
// import mobileicon from '../../../img/mobile1.png'
// import laptopicon from '../../../img/laptop1.png'
// import menwear from '../../../img/men-wear1.png'
// import womenwear from '../../../img/woman-wear1.png'
// import electronicsicon from '../../../img/electronics1.png'
import {useSelector} from 'react-redux'


const CategoryList = () => {
    const [categoryData, setCategoryData] = useState()
    const categoryState = useSelector(store=>store.category.data)
    useEffect(()=>{
        setCategoryData(categoryState) 
    }, [categoryState, categoryData])
  return (
    <div ><section className='px-2'>
    <div className="container-fluid bg-white borde border-2 d-flex align-items-center justify-content-between border-light-blue rounded shadow-s p-2 my-3">  
        <div className='d-flex align-items-center justify-content-between ms-3'>
            {
                categoryData && categoryData.map((value, i) =>{
                    return(
                        <Link className='text-center me-4' to={`/categories/${value.name}`} key={i}> 
                            <img src={`${process.env.REACT_APP_URL}/${value.icon}`} alt="" />
                            <h6 className='mt-2 cl-navy-blue text-capitalize'>{value.name}</h6>
                        </Link>
                    )
                })
            } 
        </div>
        <div className='border rounded d-inline-block px-2 py-1'>
              <h6 className='d-inline'>Sort by</h6>
              <select name="" id="" className='border-0 d-inline-block width-20'>
                <option value="">Category wise</option>
                <option value="">Company Name</option>
              </select>
        </div>
    </div>
  </section></div>
  )
}

export default CategoryList