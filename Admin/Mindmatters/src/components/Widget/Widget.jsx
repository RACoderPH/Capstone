import React, { useState, useEffect } from "react";
import axios from "axios";
import './widget.scss'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentIcon from '@mui/icons-material/Assignment';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

function Widget  ({type}){
  const [studentCount, setStudentCount] = useState(0);
  const [takenCount, setTakenCount] = useState(0);
  const [notTakenCount, setNotTakenCount] = useState(0);

  // for Taken Assessment Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // For Not Taken Assessment Modal
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [userList, setUserList] = useState([]);
  const [userNotTakenList, setUserNotTakenList] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch student count
    axios.get('https://mindmatters-ejmd.onrender.com/student_count')
      .then((response) => {
        // Update the studentCount state with the fetched count
        setStudentCount(response.data[0].student_count);
      })
      .catch((error) => {
        console.error('Failed to fetch student count:', error);
      });

      axios.get('https://mindmatters-ejmd.onrender.com/count')
      .then((response) => {
        // Update the state with the fetched counts
        setTakenCount(response.data.taken);
        setNotTakenCount(response.data.notTaken);
      })
      .catch((error) => {
        console.error('Failed to fetch assessment counts:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('https://mindmatters-ejmd.onrender.com/api/getuser')
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('https://mindmatters-ejmd.onrender.com/api/getuserNot')
      .then((response) => response.json())
      .then((data) => setUserNotTakenList(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

    let data;
    const count = 300
    const diff = 10

    switch(type){
      case "User":
        data = {
          title:"User",
          isCount:true,
          count: studentCount,
          link2:"See all users",
          icon:(
            <PersonOutlinedIcon className="icon"/>
          )
        };
        break;
        case "Take":
        data = {
          title:"Taked Assessment",
          isCount:true,
          count: takenCount, // Display the count of users who have taken the assessment
          link:"View Taken Assessments",
          icon:(
            <AssignmentIcon className="icon"/>
          )
        };
        break;
        case "Not":
        data = {
          title:"Not Take Assesment",
          isCount:true,
          count: notTakenCount, // Display the count of users who have not taken the assessment
          link1:"View not Taken Assessments",
          icon:(
            <WebAssetOffIcon className="icon"/>
          )
        };
        break;
        default:
            break;
    }

    return(

    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            {data.isCount && <span className="counter">{data.count}</span>}
            <span className="link" onClick={handleOpen}>{data.link}</span>
            <span className="link1" onClick={handleOpen1}>{data.link1}</span>
            <Link to="/user"> <span className="link2" >{data.link2}</span></Link>
            
        </div>
        <div className="right">
            <div className="percentage">  
            </div>
            {data.icon}
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="box" style={{ maxWidth: 'max-content', overflowY: 'auto', maxHeight: '700px' }}>
          <span className="userUpdateTitle">Students Already Taken the Assessment</span>
          
          <div className="listContainer">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Fullname</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Student ID</th>
        </tr>
      </thead>
      <tbody>
      {userList.map((user) => (
          <tr key={user.id}>
                  <td>{user.Fullname}</td>
                  <td>{user.user_name}</td>
                  <td>{user.Email}</td>
                  <td>{user.stud_no}</td>
          </tr>
  ))}
      </tbody>
    </table>
    </div>
          </Box>
        </Modal>

        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box className="box" style={{ maxWidth: 'max-content', overflowY: 'auto', maxHeight: '700px' }}>
  <span className="userUpdateTitle">Students Not yet Taken the Assessment</span>
  <div className="listContainer">
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Fullname</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Student ID</th>
        </tr>
      </thead>
      <tbody>
        {userNotTakenList.map((user) => (
          <tr key={user.id}>
            <td>{user.Fullname}</td>
            <td>{user.user_name}</td>
            <td>{user.Email}</td>
            <td>{user.stud_no}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</Box>

        </Modal>
    </div>
    
    )
}
export default Widget