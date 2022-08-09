import { useEffect,useState,useRef } from "react";
import axios from 'axios';
import { ContactsRoute,host} from '../utils/APIRoutes';
import './Chat.css';
import ChatSection from "../components/ChatSection";
import ReactDOM from 'react-dom/client';
import {io} from "socket.io-client";


function Chat() {


    const socket=useRef();

    const [contacts, setContacts] = useState([]);
   // const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    const [chatselected,setChatselected]=useState(false);



    useEffect( ()=>{
   
        if(localStorage.length>0)
        {
            if(JSON.parse(localStorage.getItem('chat-app-user'))['isAvtarImageSet']==false)
                window.location.href='/setAvatar'; 
        }
        else
          window.location.href='/login';

        setCurrentUser( localStorage.getItem('chat-app-user'));

        if (localStorage.getItem('chat-app-user')) 
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

  

    useEffect(()=>{
        if(currentUser)
        {
          socket.current=io(host);
          socket.current.emit("add-user",currentUser._id);
        }
    },[currentUser]);


    const openChatSection=async (contact,index)=>{  
      setChatselected(true);
      //setCurrentChat(JSON.stringify(contact)); 
     
      const rment = ReactDOM.createRoot(
        document.getElementById('chat-section')
      );

      rment.render(<ChatSection currentChat={JSON.stringify(contact)} currentUser={currentUser}  socket={socket}/>);
      
    }



    return ( 
        <>
   {    localStorage.length>0 ?

  (
  <div className="container mt-4" style={{ backgroundColor:'#141E30',color:'white'}}>
  <div class="container">
    <h3 class=" text-center"> {JSON.parse( localStorage.getItem('chat-app-user'))['name']} </h3>
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
                
                    <div id={index} class="chat_list active_chat" onClick={()=>openChatSection(contact,index)}>
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

<div id="chat-section">

</div>   
      </div>
      
      
    </div></div>
  </div>
  
  ):  (<></>)
            }
        
        </>
    );
}

export default Chat;


