import React, { useState } from 'react';
import './chat.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = { content: inputMessage, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="chat">
      <Sidebar />

      <div className="chatContainer">
        <Navbar />
        <div className="chatBox">
          <div className="messageContainer">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'userMessage' : 'otherMessage'}`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="messageInputContainer">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={handleInputChange}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
