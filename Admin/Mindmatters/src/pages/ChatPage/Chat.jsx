import React, { useEffect, useState } from 'react';
import './chat.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import io from "socket.io-client";

const socket = io.connect("https://mindmatters-ejmd.onrender.com/");

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState('12345'); // Set the default room ID to "12345"
  const username = localStorage.getItem('Username');

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        sentByUser: true, // Add a flag to identify user's own messages
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  // Automatically join the room when the component mounts
  useEffect(() => {
    joinRoom();
  }, []);

  useEffect(() => {
     // Handle incoming messages
     const handleReceiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className="chat">
      <Sidebar />
        <div className="userOnline">
            <p>
              
            </p>
        </div>
      <div className="chatContainer">
        <div className="chatBox">
          <input
            style={{ visibility: 'hidden' }}
            type="text"
            placeholder="Room ID..."
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          {/* The "Join A Room" button is removed since we're automatically joining */}
          <div className="messageContainer">
            <div className="scrollableMessages">
              {messageList.map((messageContent, index) => {
                // Use the unique 'id' or 'key' of each message as the key in the map function
                return (
                  <div
                    key={index}
                    className={`message ${
                      messageContent.sentByUser ? 'userMessage' : 'otherMessage'
                    }`} style={{flexWrap:'wrap'}}
                  >
                    <h3 className="messageText" style={{ fontSize: 25 }}>
                      {messageContent.message}
                    </h3>
                    <div className="message-meta">
                      <p id="time" style={{ fontSize: 20 }}>
                        {messageContent.time} {messageContent.author}
                      </p>
                    </div>
                  </div>
                );
              })}
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
