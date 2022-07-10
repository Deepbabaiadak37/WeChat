import React,{useState} from 'react';
import './Register.css';
import logo from '../assets/logo2.png';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {RegisterRoute} from '../utils/APIRoutes';


function Register() 
{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [cpassword,setCpassword]=useState("");
    const navigate=useNavigate();


    const toastRedConfig={
        duration: 2000,
        position: 'top-center',
        // Styling
        style: {
            padding: '20px',
            fontWeight: '700',
            width:'100%',
            backgroundColor:' #f80759',
            color:'white'
        },
        className: '',
        // Custom Icon
        icon: '⚠',
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000'
        },
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      };
    const toastGreenConfig={
        duration: 2000,
        position: 'top-center',
        // Styling
        style: {
            padding: '20px',
            fontWeight: '700',
            width:'100%',
            backgroundColor:'#00c851',
            color:'white'
        },
        className: '',
        // Custom Icon
        icon: '✅',
        // Change colors of success/error/loading icon
        iconTheme: {
        primary: '#000'
        },
        // Aria
        ariaProps: {
        role: 'status',
        'aria-live': 'polite',
        },
    }
    


    const handleSubmit=async (event)=>
    {
        event.preventDefault();
        if(Validated())
        {
           const {data}= await axios.post(RegisterRoute,{ name,email,password });
           if(data.status==false)
           {
            toast(data.msg,toastRedConfig);
           }
           else
           {
            toast("Sign Up Successfull !!",toastGreenConfig)
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
           
            setTimeout(
                function() {
                    navigate("/login");
                }
                .bind(this),
                2000
            );
           }

        }
    }

    const Validated=()=>{
         if(!name || !email || !password || !cpassword)
         {
            toast('All fields are mandatory!!', toastRedConfig);
            return false;
         }
         else
         {
            const regex=new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            
            if(!regex.test(email))
            {
                toast('Email is not Valid!!', toastRedConfig);
                return false;
            }
            else
            {
                if(password.length<=5)
                {
                    toast('Password length should be greater than 5!!', toastRedConfig);
                    return false;
                }
                else
                {
                    if(password!=cpassword)
                    {
                        toast('Password is not matching!!', toastRedConfig);
                        return false;
                    }
                        
                }
            }
         }

         return true;
    }




    return ( 
        <>
            <div style={{ backgroundColor:'#0074D9',color:'white'}}>
            <Toaster  position="top-right" reverseOrder={false}  />

                <div className="reg-form">
                    <form >
                        <div className='d-flex justify-content-center'>
                            <div style={{ display:'inline-block'}}>
                                <img src={logo} height="50" width="50" style={{ alignItems:'center',gap:'1rem',justifyContent:'center'}}/>
                            </div>
                            <div style={{ display:'inline-block',verticalAlign: "middle"}}>
                                <h2 style={{ fontSize:'33px'}}>&nbsp;WE <span style={{ color: '#0074D9',fontSize:'33px'}}>CHAT</span></h2>
                            </div>
                        </div>
                        
                        <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping"> <i class="fa fa-user-circle-o" aria-hidden="true"></i> </span>
                            <input type="text" class="form-control" placeholder="Username" onChange={(e)=>setName(e.target.value)} value={name}/>
                        </div>
                    
                        <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping"> <i class="fa fa-envelope" aria-hidden="true"></i> </span>
                            <input type="email" class="form-control" placeholder="Email"  onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        </div>

                        <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping"> <i class="fa fa-key" aria-hidden="true"></i> </span>
                            <input type="password" class="form-control" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        </div>

                        <div class="input-group flex-nowrap">
                            <span  class="input-group-text" id="addon-wrapping">  <i  class="fa fa-key" aria-hidden="true"></i>  </span>
                            <input type="password" class="form-control" placeholder="Confirm password"  onChange={(e)=>setCpassword(e.target.value)} value={cpassword}/>
                            
                        </div>

                        <button onClick={handleSubmit}>SignUp</button><hr></hr>
                        <span>Already have account?.. &nbsp;&nbsp;<a href='/login'>Login</a></span>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;



