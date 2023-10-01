import { useState } from 'react'

import Login from './pages/LoginPage/AdminLogin'
import Register from './pages/LoginPage/Login'
import Home from './pages/HomePage/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './pages/UserPage/User';
import { useContext } from "react";
import Assessment from './pages/AssessmentPage/Assessment';
import Annoucement from './pages/AnnouncementPage/Annoucement';
import Chat from './pages/ChatPage/Chat';
import Profile from './pages/ProfilePage/Profile';
import Notify from './pages/NotificationPage/Notify';

function App() {
    //const { darkMode } = useContext(DarkModeContext);
  
    return (
      //<div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="home" element={<Home />} />
              <Route path="user"  element={<User />} />
              <Route path="assessment"  element={<Assessment />} />
              <Route path="announce"  element={<Annoucement />} />
              <Route path="chat"  element={<Chat />} />
              <Route path="notification"  element={<Notify />} />
              <Route path="profile"  element={<Profile />} />
          </Routes>
        </BrowserRouter>
      //</div>
    );
  
}

export default App
