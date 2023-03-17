import { useEffect, useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Category = ()=>{

    const navigate = useNavigate()
    const auth = localStorage.getItem('admindata')
    useEffect(()=>{ 
        if(!auth){
            navigate("/admin/login")
        }
    })

    const [data, setData] = useState({});
    const [icon, setIcon] = useState()
    const [image, setImage] = useState()
    
    const fromhandle = (e)=>{
        const name = e.target.name
        const value = e.target.value 
        setData({...data, [name]:value})
    } 

    const submit = async(e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("icon", icon)
        formData.append("image", image) 
        try{
            await axios.post(`${process.env.REACT_APP_URL}/category`, formData).then((e)=>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Accout Create Success',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
        }catch(err){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Accout Create Success',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
    return(
        <>
        <Navbar/>
        <form action="" className="w-50 m-auto p-3 border mt-5 shadow">
            <div className="form-group mb-3">
                <label htmlFor="">Category Name</label>
                <input type="text" name="name" onChange={fromhandle} className="form-control" id="" placeholder="Category Name" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="">Icon</label>
                <input type="File" name="icon" onChange={(e)=>{setIcon(e.target.files[0])}} className="form-control" id="" placeholder="Category Name" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="">Image</label>
                <input type="file" name="image" onChange={(e)=>{setImage(e.target.files[0])}} className="form-control" id="" placeholder="Category Name" />
            </div>
            <div className="form-group">
                <input type="submit" onClick={submit} className="form-control bg-orange text-white" id="" value="Submit" />
            </div>
        </form>
        </>
    )
}

export default Category