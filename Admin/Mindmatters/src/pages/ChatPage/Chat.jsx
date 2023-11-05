import React, { useEffect, useRef ,useState} from 'react';
import './chat.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import io from "socket.io-client";
import avatar from "../../images/blank.png"
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { storage, store } from "../../firebase";




const socket = io.connect("https://mindmatters-ejmd.onrender.com/");

const Chat = () => {
  const [userList, setUserList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState(''); // Set the default room ID to an empty string
  const username = localStorage.getItem('Username');
  
  const chatsRef = collection(store, "Messages")


  const roomRef = useRef(room);


  useEffect(()=>{

    const q = query(chatsRef , orderBy('createdAt' , 'asc'))
  
    const unsub = onSnapshot(q, (querySnapshot) =>{
      const fireChats =[]
      querySnapshot.forEach(doc => {
        fireChats.push(doc.data())
      });
     setMessageList([...fireChats])
    })
    return ()=> {
      unsub()
    }
  
  },[])

  function addToFirebase(messageData) {
    const newChat = {
      createdAt: messageData.time,
      user: messageData.author,
      message: messageData.message,
      room: room,
    };

    const chatRef = doc(chatsRef); // Assuming you have chatRef defined properly
    setDoc(chatRef, newChat)
      .then(() => console.log('Chat added successfully'))
      .catch(console.error);
  }



   // Updated joinRoom function
   const joinRoom = (room_id) => {
    if (room_id !== "") {
      roomRef.current = room_id; // Update the mutable ref
      setRoom(room_id); // Set the room with the selected room_id
      socket.emit("join_room", room_id);
    }
  };

  useEffect(() => {
    // Handle incoming messages
    const handleReceiveMessage = (data) => {
      // Check if the room of the incoming message matches the current room ID
      if (data.room === roomRef.current) {
        // Access room value from the 
        data.sentByUser = false;
        setMessageList((list) => [...list, data]);
      } 
    };

    socket.on("receive_message", handleReceiveMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);


 // ...

 const sendMessage = async () => {
  if (currentMessage !== '') {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const day = now.getDate().toString().padStart(2, '0');
    const hours24 = now.getHours();
    const hours12 = (hours24 % 12) || 12; // Convert to 12-hour format
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const messageData = {
      room: room,
      author: username,
      message: currentMessage,
      time: `${year}-${month}-${day} ${hours12}:${minutes}:${seconds} ${ampm}`,
      sentByUser: true,
    };

    // Add the message to Firebase
    addToFirebase(messageData);

    // Send the message through socket.io
    await socket.emit('send_message', messageData);

    setMessageList((list) => [...list, messageData]);
    setCurrentMessage('');
  }
};



// ...
  useEffect(() => {
    // Fetch user data from the backend API
    fetch('https://mindmatters-ejmd.onrender.com/Student')
      .then((response) => response.json())
      .then((data) => {
        console.log('User data:', data); // Log the user data
        setUserList(data);
      })
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  const handleUserClick = (user) => {
    const room_id = user.room_id;
    joinRoom(room_id); // Automatically join the room
  };


  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

  return (
    <div className="chat">
      <Sidebar />
      <div className="userOnline">
        {userList.map((user) => (
          <List sx={style} component="nav" aria-label="mailbox folders" key={user.Fullname}>
           <ListItem
              button
              alignItems="flex-start"
              onClick={() => handleUserClick(user)} // Automatically join the room on user click
            >
              <Avatar src={user.image_file} alt={user.Fullname} className="user-profile-pic" />
              <div className="user-info">
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {user.Fullname}
                </Typography>
                <ListItemText className={`user-status ${user.status === "online" ? "online" : "offline"}`}>
                  {user.status === "online" ? "Online" : "Offline"}
                </ListItemText>
                <Divider />
              </div>
            </ListItem>
          </List>
        ))}
      </div>

      <div className="chatContainer">
        <div className="chatBox">
          <input
            style={{visibility:'hidden',display:'none'}}
            type="text"
            placeholder="Room ID..."
            value={room}
            readOnly
          />

<div className="messageContainer">
<div className="scrollableMessages">
  <div className="messageContainers">
    {messageList
      .filter((message) => message.room === room) // Filter messages by room
      .map((messageContent, index) => {
        console.log("Message content:", messageContent); // Log message content
        const isUserMessage = messageContent.user === username;
        const messageStyle = isUserMessage ? 'userMessage' : 'otherMessage';

        return (
          <div
            key={index}
            className={`message ${messageStyle}`}
            style={{ flexWrap: 'wrap' }}
          >
            <h3 className="messageText" style={{ fontSize: 25 }}>
              {messageContent.message}
            </h3>
            <div className="message-meta">
              <p id="time" style={{ fontSize: 20 }}>
                {messageContent.user}, {messageContent.createdAt}
              </p>
            </div>
          </div>
        );
      })}
  </div>
</div>

</div>


          <div className="messageInputContainer">
            <input
              type="text"
              placeholder="Type your message..."
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
