import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Rightchat.css';
import Avatar from '@material-ui/core/Avatar';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { IconButton } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import SearchIcon from '@material-ui/icons/Search';
import db from "../firebase-config";
import MainChat from './MainChat';
import firebase from "firebase";
import SendIcon from '@material-ui/icons/Send';


const Rightchat = (props) => {
    const [input, setinput] = useState("");
    const [msg, setmsg] = useState([])
    const [room, setRoom] = useState()
    const { roomId } = useParams();
    
    function sendmsg(e) {
        e.preventDefault();

        (props.context.displayName) ?

            db.collection("rooms").doc(roomId).collection("messages").add({
                msg: input,
                sent_at: firebase.firestore.FieldValue.serverTimestamp(),
                sender: props.context.displayName
            }) : alert("Please login to send messages");

        setinput("");

    }


    useEffect(() => {
        const unsubscibe= db.collection("rooms").doc(roomId).onSnapshot((snap) => {
            setRoom(snap.data().roomname)
        })

        const cleanup=  db.collection("rooms").doc(roomId).collection("messages").orderBy('sent_at').onSnapshot((snap) => {
            setmsg(snap.docs.map(doc=>doc.data()))
        })

        return () => {
            unsubscibe();
            cleanup();
        }
    }, [roomId]);


    return (<>
        <div className="Rightchat">
            <div className="rightchat_header">
            <Avatar alt="Remy Sharp" src={`https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3723374.jpg`} />
                <div className="Header_title">
                    <h4>{room}</h4>
                    <small>Last seen at 8:30</small>
                </div>
                <div className="right_icon">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
                <MainChat msg={msg} username={props.context.displayName}/>
            
            <div className="type_msg_container">
                <InsertEmoticonIcon />
                <div className="type_bar">
                    <form>
                        <input type="text" onChange={(e) => { setinput(e.target.value) }} value={input} placeholder="Type a message" />
                        <IconButton type="submit" onClick={sendmsg} style={{ color:"white",backgroundColor:"#00bfa5" }}>
        <SendIcon/>
        </IconButton>
                    </form>
                </div>
                <MicIcon />
            </div>

        </div>
    </>);
}
export default Rightchat;