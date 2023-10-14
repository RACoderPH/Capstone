import React, { useState, useEffect } from "react";
import axios from "axios";
import './widget.scss'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentIcon from '@mui/icons-material/Assignment';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';

function Widget  ({type}){
  const [studentCount, setStudentCount] = useState(0);
  const [takenCount, setTakenCount] = useState(0);
  const [notTakenCount, setNotTakenCount] = useState(0);

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

    let data;
    const count = 300
    const diff = 10

    switch(type){
      case "User":
        data = {
          title:"User",
          isCount:true,
          count: studentCount,
          link:"See all users",
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
          link:"View details",
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
          link:"View details",
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
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
                {diff}%
            </div>
            {data.icon}
        </div>
    </div>
    )
}
export default Widget