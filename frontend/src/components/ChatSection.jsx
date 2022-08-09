import React from 'react';
import Picker from 'emoji-picker-react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { GetAllMessageRoute } from '../utils/APIRoutes';
import {SendMessageRoute} from '../utils/APIRoutes';

import { useRef } from 'react';

import {v4 as uuidv4} from "uuid";

function ChatSection(props) 
{
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [input,setInput]=useState("");
  const [selected,setSelected]=useState(false);
  const [msgdata,setMsgdata]=useState([]);
  const [arrivalMessage,setArrivalMessage]=useState(null);
  const scrollRef=useRef();


  const onEmojiClick = (event, emojiObject) => {
    var ans="";
    setChosenEmoji(emojiObject);
    ans=ans+input+emojiObject.emoji;
    setInput(ans);
  };
 


  useEffect(()=>{
    axios.post(GetAllMessageRoute,{
      from:JSON.parse(props.currentUser)['_id'],
      to:JSON.parse(props.currentChat)['_id']
     })
        .then(res=>{ 
          setMsgdata(res.data);
        })
        .catch(error => {
            
            console.error('There was an error!', error);
        });

  },[])


  const emojiSelect=()=>{
    setSelected(!selected);
  }


  const sendMessage=async ()=>{
     axios.post(SendMessageRoute,{
      from:JSON.parse(props.currentUser)['_id'],
      to:JSON.parse(props.currentChat)['_id'],
      message:input
     })
        .then(res=>{ 
          console.log(res);
        })
        .catch(error => {
            
            console.error('There was an error!', error);
        });
      setInput("");


      props.socket.current.emit("send-msg",{
        to:JSON.parse(props.currentChat)['_id'],
        from:JSON.parse(props.currentUser)['_id'],
        message:input
      });

      const msgs=[...msgdata];
      msgs.push({returnSelf:true,message:input});
      setMsgdata(msgs);

  };


  useEffect(()=>{
    if(props.socket.current)
    {
        props.socket.current.on("msg-recieve",(msg)=>{
        setArrivalMessage({returnSelf:false,message:msg});

      })
    }
  },[]);

  useEffect(()=>{
      arrivalMessage && setMsgdata((prev)=>[...prev,arrivalMessage]);
  },[arrivalMessage])


  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ behaviour:"smooth"});
  },[msgdata]);

  const handleInput=(e)=>{
    setInput(e.target.value);
  }
    return (  
      
        <>

        
     {console.log(msgdata)}
        <div class="mesgs">
          <div class="msg_history"  >
              {
                msgdata.map((msg)=>{
                  return(
                          <>
                          <div ref={scrollRef} key={uuidv4()}>
                            <div class={msg.returnSelf?"outgoing_msg":"incoming_msg"}>
                                <div class={msg.returnSelf?"sent_msg":"received_msg received_withd_msg mb-3"}>
                                  <p>{msg.message}</p>
                                </div>
                            </div>
                          </div>
                            
                          </>
                  );
                })
              }

{/*
            <div class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>Test which is a new approach to have all
                    solutions</p>
                  <span class="time_date"> 11:01 AM    |    June 9</span>
                </div>
              </div>
            </div>

            <div class="outgoing_msg">
              <div class="sent_msg">
                <p>Test which is a new approach to have all
                  solutions</p>
                <span class="time_date"> 11:01 AM    |    June 9</span> 
              </div>
            </div>


            */}
          
          </div>








          <div class="type_msg">
                    {selected && <Picker onEmojiClick={onEmojiClick} pickerStyle={{ position: 'absolute',top:'-365px' }}/>} 
            <div class="input_msg_write">
              <button onClick={emojiSelect} className="btn btn-primary cus mt-2 "><i class='fa fa-smile-o' style={{fontSize:'31px'}}></i></button>
              <input type="text" class="write_msg" placeholder="Type a message" onChange={handleInput}  value={input}/>
              <button class="msg_send_btn" type="button" onClick={sendMessage}><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>




        </div>

        </>
    );
}

export default ChatSection;