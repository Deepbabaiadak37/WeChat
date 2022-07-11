import React from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './SetAvatar.css';

export default function SetAvatar() {

  const navigate = useNavigate();

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
  };


const handlefunction=(e)=> {
  document.getElementById('imagePreview').style['background-image']= "url("+URL.createObjectURL(e.target.files[0])+")";

};


  return (
    <>
     <Toaster  position="top-right" reverseOrder={false}  />
      <div style={{ marginTop:'10%'}}>
          <h1 class="d-flex justify-content-center" style={{ color:'white'}}>Upload Profile Picture </h1>
        <div class="avatar-upload">
            <div class="avatar-edit">
                <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={handlefunction}/>
                <label for="imageUpload" ><i class="fa fa-pencil fa-lg" aria-hidden="true"></i></label>
            </div>
            <div class="avatar-preview">
                <div id="imagePreview" style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU)'}} >
                </div>
            </div>
        </div>
      </div>
    
    
    </>
  );
}
