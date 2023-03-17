import '../../App.css';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import sinupside from '../../img/sinupside.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser,  faKey, faPhone, faBuildingUser} from '@fortawesome/free-solid-svg-icons'  
import { useEffect, useState } from 'react'; 
import Navbar from './Navbar';
 
const SignUp = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [formErr, setFormErr] = useState("")
    const [companyErr, setCompanyErr] = useState("")
    const [emailErr, setEmailErr] = useState("")


    const formHandle = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]:value})
    }

    const sendData = async(e)=>{
        e.preventDefault();
        if(data.password === data.cpassword){ 
            setFormErr("")
            try{
                await axios.post('http://localhost:5000/seller' , data)
                setEmailErr("")
                setCompanyErr("")
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Accout Create Success',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(()=>{
                    navigate('/seller/login')
                  })
            }catch(err){
                const errmsg = err.response.data.message
                const errspecial = errmsg.split(' ') 
                if(errspecial[1] === "duplicate"){
                    switch(errspecial[7]) {
                        case "company_1":
                            setCompanyErr("This company already exists");
                            setEmailErr("")
                          break;
                        case "email_1":
                            setEmailErr("This email already exists. Please enter another email address");
                            setCompanyErr('')
                          break;
                        default:
                            setEmailErr("")
                            setCompanyErr("")
                      }
                }
            }
            
            
        }else{
            setFormErr("Please enter correct password")
        }
        
    }

    const auth = localStorage.getItem('sellerdata')
    useEffect(()=>{
        if(auth){
            navigate("/seller")
        }
    }, [])
  return (
    <>

    {!auth ? 
    <div>
    <Navbar/>
    <section className="overflow-auto py-2">
        <div className="container signup-container">
            <div className="signup-wrap ">
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
                                    <h3>Sign Up</h3>
                                </div>
                                <div className='mb-2'>
                                    <small className='text-danger'>{formErr}</small>
                                </div>
                                <form action=""> 
                                    <div className="form-item"> 
                                        <FontAwesomeIcon className="cl-orange" icon={faUser}/>
                                        <input type="text" className="form-contro" name='name' placeholder='Name' onChange={formHandle}/>
                                    </div>
                                    <div className="form-item"> 
                                        <FontAwesomeIcon className="cl-orange" icon={faBuildingUser}/>
                                        <input type="text" className="form-contro" name='company' placeholder='Company Name' onChange={formHandle}/>
                                    </div>
                                    <small className='text-danger pb-2 d-block'>{companyErr}</small>
                                    <div className="form-item"> 
                                        <FontAwesomeIcon className="cl-orange" icon={faEnvelope}/>
                                        <input type="email" className="form-contro" name='email' placeholder='Email' onChange={formHandle}/>
                                    </div>
                                    <small className='text-danger pb-2 d-block'>{emailErr}</small>
                                    <div className="form-item"> 
                                        <FontAwesomeIcon className='cl-orange' icon={faPhone}/>
                                        <input type="text" className="form-contro" name='phone' placeholder='Phone' onChange={formHandle}/>
                                    </div>
                                    <div className="form-item"> 
                                        <FontAwesomeIcon className="cl-orange" icon={faKey}/>
                                        <input type="text" className="form-contro" name='password' placeholder='Password' onChange={formHandle}/>
                                    </div>
                                    <div className="form-item"> 
                                        <FontAwesomeIcon className="cl-orange" icon={faKey}/>
                                        <input type="text" className="form-contro" name='cpassword' placeholder='re-enter Password' onChange={formHandle}/>
                                    </div>
                                    <div>
                                        <button className="sin-btn" onClick={sendData}>Sign Up</button>
                                    </div>
                                </form>
                                <div className='mt-3'>
                                  <p>Already have an account? <Link className='cl-orange fw-bold' to="/seller/login">Log In</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
    : null}
    </>
  )
}

export default SignUp