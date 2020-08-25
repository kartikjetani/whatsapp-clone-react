import React from "react";
import "./Rightchat.css";
// import { User } from '../App';

function MainChat(props) {
    
  return (
    <div className="MainChat_container">
      <ul>
        {props.msg.map((item, index) => (
          <li
            className={
              !(item.sender === props.username) ? "chat_receive" : "MainChat"
            }
            key={index}
          >
            <span>{item.sender}</span>
            {item.msg}
                <small>
             { !(item.sent_at)?"17:10":`${new Date(item.sent_at.seconds * 1000).getHours()}:${new Date(
    item.sent_at.seconds * 1000
  ).getMinutes()} `}
            </small>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default MainChat;
