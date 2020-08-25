import React, { useState,useEffect,useContext} from 'react';
import './Leftpanel.css';
import Avatar from '@material-ui/core/Avatar';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatPreview from './ChatPreview';
import { Link} from 'react-router-dom';
import db,{auth} from '../firebase-config';
import { User } from '../App'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const Leftpanel = () => {
    const [roomdata, setRoomdata] = useState([]);
    const con_data = useContext(User)

    function create_newchat() {
        let new_room_name = prompt("Enter name of your new group");
        (new_room_name)?
        db.collection("rooms").add({
            roomname: new_room_name
        }):console.log("Cancelled")
    }

    // const logOut = () => {
    //     auth.signOut()
    //     console.log("Sign out")
   
    // }

    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => {
            setRoomdata(snapshot.docs.map(item => (
                {
                id: item.id,
                name: item.data().roomname
            }
        )))
        })

        
    },[])

    return  (<>
          
        <div className="Leftpanel">
            <div className="profile_header">
                <Avatar alt="Remy Sharp" src={con_data.user.photoURL} />
                
                <div className="icon_topright">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton title="Create new group" onClick={create_newchat}>
                        <ChatIcon />
                    </IconButton>
                    <IconButton title="Log Out" onClick={() => auth.signOut()}>
                   <ExitToAppIcon />
                        
                    </IconButton>
                </div>
            </div>
            <div className="Search_container">
                <div className="Searchbar">
                <SearchIcon />
                    <input type="text" placeholder="Search or start new chat" />
                    </div>
            </div>
            <div >
                    {roomdata.map((data,index) => (
                        <Link style={{ textDecoration: 'none' }} key={index} to={`/rooms/${data.id}`}><ChatPreview  roomdata={data}  /> </Link>
                    ))}
                    
           </div>
            
                        
        </div>
    </>)
}
export default Leftpanel;