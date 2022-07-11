import React, { useEffect, useState } from "react";
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





  return (
    <>
     <Toaster  position="top-right" reverseOrder={false}  />
    
    
    </>
  );
}
