import React, { useState, useEffect } from "react";
import axios from "axios";
import './widget.scss'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentIcon from '@mui/icons-material/Assignment';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';
function Widget  ({type}){
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    // Make an HTTP GET request to fetch student count
    axios.get('http://localhost:5000/student_count')
      .then((response) => {
        // Update the studentCount state with the fetched count
        setStudentCount(response.data[0].student_count);
      })
      .catch((error) => {
        console.error('Failed to fetch student count:', error);
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
          link:"View details",
          icon:(
            <AssignmentIcon className="icon"/>
          )
        };
        break;
        case "Not":
        data = {
          title:"Not Take Asseesment",
          isCount:true,
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
            <span className="counter">{data.isCount && studentCount}</span>
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