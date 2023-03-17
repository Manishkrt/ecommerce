import '../../App.css';
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import sinupside from '../../img/sinupside.jpg'
import Swal from 'sweetalert2'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,  faKey} from '@fortawesome/free-solid-svg-icons'   
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
const fontEmail = <FontAwesomeIcon icon={faEnvelope} />
const fontKey= <FontAwesomeIcon icon={faKey} />

const LogIn = () => {

    const navigate = useNavigate()
    const auth = localStorage.getItem('admindata')
    useEffect(()=>{ 
        if(auth){
            navigate("/admin")
        }
    })


    const [data, setData] = useState({})
    const [errMsg, setErrMsg] = useState("")
    // const navigate = useNavigate()  
    const formHandle = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]:value})
    }

    const submit = async(e)=>{
        e.preventDefault();
        try{
            await axios.post(`${process.env.REACT_APP_URL}/admin/login` , data).then((e)=>{  
                setErrMsg('')
                localStorage.setItem('admindata', JSON.stringify(e.data));
                navigate('/admin')
            }) 
        } catch(err){ 
            if(err.response.status === 500){
                setErrMsg("Please enter a valid email and password");
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Something went wrong',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } 
    }

  return ( 
    <> 
    <Navbar/>
        <section className="overflow-auto py-1">
            <div className="container login-container">
                <div className="signup-wrap">
                    <div className="row">
                        <div className="col-lg-6 p-0 ">
                            <div className="h-100  py-5   ">
                                <img src={sinupside} className="img-fluid w-100" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 p-0">
                            <div className="h-100 p-5 sign-form-box">
                                <div>
                                    <div className='mb-3'>
                                        <h3>Log In</h3>
                                    </div>
                                    <div className='mb-2'>
                                        <small className='text-danger'>{errMsg}</small>
                                    </div>
                                    <form >  
                                        <div className="form-item"> 
                                            <i className="cl-orange">{fontEmail}</i> 
                                            <input type="email" onChange={formHandle} name="email" className="form-contro" placeholder='Email'/>
                                        </div>
                                        <div className="form-item"> 
                                            <i className="cl-orange">{fontKey}</i> 
                                            <input type="text" onChange={formHandle} name="password"  className="form-contro" placeholder='Password'/>
                                        </div>
                                        <div>
                                            <button className="sin-btn" onClick={submit}>Log In</button>
                                        </div>
                                    </form>
                                    {/* <div className="mt-3">
                                      <p>Create a new account. <Link className='cl-orange fw-bold' to="/seller/signup">Sign Up</Link></p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default LogIn