import React from "react";
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person3Icon from '@mui/icons-material/Person3';
import CampaignIcon from '@mui/icons-material/Campaign';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import axios from 'axios';

function Sidebar() {
  //Logout
  const logout = () => {
    const userId = localStorage.getItem('ID'); // Get the user ID from localStorage
  
    // Make a request to the backend to update the status
    axios
      .post(`http://localhost:5000/logout`, {userId: userId})
      .then((response) => {
        if (response.status === 200) {
           console.log(userId);
          // Clear localStorage and redirect
          localStorage.removeItem('ID');
          localStorage.removeItem('Username');
          window.location.href = '/';
        } else {
          console.error('Failed to update status:', response.status);
          // Handle the error case accordingly
        }
      })
      .catch((error) => {
        console.error('Failed to update status:', error);
        // Handle the error case accordingly
      });
  }

  return (
    <div className="sidebar">
      <div className="top">
      
          <span className="logo">Mind Matters Admin</span>
      
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>

          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>DashBoard</span>
            </li>
          </Link>

          <p className="title">LIST</p>
          <Link to="/user" style={{ textDecoration: "none" }}>
            <li>
              <Person3Icon className="icon" />
              <span>User</span>
            </li>
          </Link>
          <p className="title">TOOLS</p>
          <Link to="/announce" style={{ textDecoration: "none" }}>
          <li>
            <CampaignIcon className="icon" />
            <span>Announcement</span>
          </li>
          </Link>

          <Link to="/assessment" style={{ textDecoration: "none" }}>
          <li>
            <AssessmentIcon className="icon" />
            <span>Assessment</span>
          </li>
          </Link>

          <Link to="/chat" style={{ textDecoration: "none" }}> 
          <li>
            <MarkChatUnreadIcon className="icon" />
            <span>Chat</span>
          </li>
          </Link>
            {/*
          <Link to="/notification" style={{ textDecoration: "none" }}> 
          <li>
            <NotificationsActiveIcon className="icon" />
            <span>Notification</span>
          </li>
          </Link>
*/}
          <p className="title">USER</p>

          <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <ManageAccountsIcon className="icon" />
              <span>Profile</span>
          </li>
          </Link>

          <li>
            <LogoutIcon className="icon" />
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
}

export default Sidebar;
