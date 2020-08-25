import React,{useEffect,useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Leftpanel.css";
import db  from '../firebase-config';

export default function ChatPreview(props) {

    const [lastmsg, setlastmsg] = useState([])

    useEffect(() => {
      const cleanup=  db.collection("rooms").doc(props.roomdata.id).collection("messages").orderBy('sent_at',"desc").limit(1).onSnapshot((snap) => {
            (snap.docs.map(doc=>setlastmsg(doc.data().msg)))
        })
        return () => {
            cleanup();
        }
    }, [props.roomdata.id])

  return (
    <div className="chat_preview_container">
      <Avatar
        alt="Remy Sharp"
        src={`https://joeschmoe.io/api/v1/male/${Math.random()}`}
      />

      <div>
        <h3>{props.roomdata.name}</h3>
        {/* <p>{props.roomdata.lastmsg}</p> */}
              <p>{lastmsg.slice(0,20)+"..."}</p>
      </div>
    </div>
  );
}
