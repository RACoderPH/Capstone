import React from 'react'
import './chat.scss' 
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'

const Chat = () => {
  return (
    <div className="chat">
             <Sidebar/>

             <div className="chatContainer">
             <Navbar/>
             <p>Chat</p>
             </div>
    </div>

   
   
  )
}

export default Chat