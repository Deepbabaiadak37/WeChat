import { useEffect,useState,useRef } from "react";
import axios from 'axios';
import { ContactsRoute} from '../utils/APIRoutes';
import './Chat.css';

function Chat() {
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect( ()=>{
   

        if(!localStorage.getItem('chat-app-user') || localStorage.getItem('chat-app-user')==undefined)
            window.location.href='/login';

        else
        {
            if(JSON.parse(localStorage.getItem('chat-app-user'))['isAvtarImageSet']==false)
                window.location.href='/setAvatar';
            
        }

        setCurrentUser( JSON.parse( localStorage.getItem('chat-app-user')) );


        if (JSON.parse( localStorage.getItem('chat-app-user')) ) 
        {
            if (JSON.parse( localStorage.getItem('chat-app-user'))['isAvtarImageSet']) 
            {
                axios.get(ContactsRoute+'/'+JSON.parse( localStorage.getItem('chat-app-user'))['_id']).then((res)=>{
                   
                  var arr=[];
                  for(let i=0;i<res.data.length;i++)
                  {
                      arr.push(res.data[i]);
                  }
                  
                    setContacts(arr);
                    
              });
              
            } 
            else 
            {
              window.location.href="/setAvatar";
            }
          }

    },[]);


    return ( 
        <>
       {/* 

        {contacts.map((contact, index) => {
              return (
                      
                      <p>{contact.name}</p>
                   
              );
            })
        }

      */}



  <div className="container" style={{ backgroundColor:'#203A43',color:'white'}}>
  <div class="container">
<h3 class=" text-center">Messaging</h3>
<div class="messaging">
      <div class="inbox_msg">

        
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar"  placeholder="Search" />
                <span class="input-group-addon">
                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                </span> </div>
            </div>
          </div>
          <div class="inbox_chat">

            {contacts.map((contact, index) => {
              return (
                <div class="chat_list active_chat">
                <div class="chat_people">
                  <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                  <div class="chat_ib">
                    <h5> {contact.name}<span class="chat_date">Dec 25</span></h5>
                    <p>Typing....</p>
                  </div>
                </div>
              </div>
                      
                   
              );
            })
        }



          </div>
        </div>












        <div class="mesgs">
          <div class="msg_history">
            <div class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>Test which is a new approach to have all
                    solutions</p>
                  <span class="time_date"> 11:01 AM    |    June 9</span></div>
              </div>
            </div>
            <div class="outgoing_msg">
              <div class="sent_msg">
                <p>Test which is a new approach to have all
                  solutions</p>
                <span class="time_date"> 11:01 AM    |    June 9</span> </div>
            </div>
            <div class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>Test, which is a new approach to have</p>
                  <span class="time_date"> 11:01 AM    |    Yesterday</span></div>
              </div>
            </div>
            <div class="outgoing_msg">
              <div class="sent_msg">
                <p>Apollo University, Delhi, India Test</p>
                <span class="time_date"> 11:01 AM    |    Today</span> </div>
            </div>
            <div class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>
                    products, at a price anyone can afford.</p>
                  <span class="time_date"> 11:01 AM    |    Today</span></div>
              </div>
            </div>
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input type="text" class="write_msg" placeholder="Type a message" />
              <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
      
      
    </div></div>
  </div>
        
        </>
    );
}

export default Chat;


