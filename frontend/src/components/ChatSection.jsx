import React from 'react';
import Picker from 'emoji-picker-react';
import { useState } from 'react';

function ChatSection(props) 
{
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [input,setInput]=useState("");
  const [selected,setSelected]=useState(false);


  const onEmojiClick = (event, emojiObject) => {
    var ans="";
    setChosenEmoji(emojiObject);
    ans=ans+input+emojiObject.emoji;
    setInput(ans);
  };



  const emojiSelect=()=>{
    setSelected(!selected);
  }


  const handleInput=(e)=>{
    setInput(e.target.value);
  }
    return (  

        <div class="mesgs">
         
         {props.currentUser} {props.value}
         
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

         {selected && <Picker onEmojiClick={onEmojiClick} pickerStyle={{ position: 'absolute',top:'-365px' }}/>}

            
            <div class="input_msg_write">
              <button onClick={emojiSelect} className="btn btn-primary cus mt-2 "><i class='fa fa-smile-o' style={{fontSize:'31px'}}></i></button>
              <input type="text" class="write_msg" placeholder="Type a message" onChange={handleInput}  value={input}/>
              <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>


          </div>



     



        </div>
    );
}

export default ChatSection;