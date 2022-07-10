import React, { useEffect, useState } from "react";=
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { SetAvatarRoute } from "../utils/APIRoutes";


export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

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

  useEffect(async () => {
    if (!localStorage.getItem('chat-app-user'))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast("Please select an avatar", toastRedConfig);
    } 
    else 
    {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));

      const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) 
      {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem( process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user) );
        navigate("/");
      } 
      else 
        toast("Error setting avatar. Please try again.", toastRedConfig);
      
    }
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);


  return (
    <>
     <Toaster  position="top-right" reverseOrder={false}  />

      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <div className="div-body">
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
        </div>
      )}
    </>
  );
}
