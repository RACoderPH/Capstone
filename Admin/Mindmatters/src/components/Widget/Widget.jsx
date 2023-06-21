import React from "react";
import './widget.scss'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentIcon from '@mui/icons-material/Assignment';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';
function Widget  ({type}){

    let data;
    const count = 300
    const diff = 10

    switch(type){
      case "User":
        data = {
          title:"User",
          isCount:false,
          link:"See all users",
          icon:(
            <PersonOutlinedIcon className="icon"/>
          )
        };
        break;
        case "Take":
        data = {
          title:"Taked Assessment",
          isCount:false,
          link:"View details",
          icon:(
            <AssignmentIcon className="icon"/>
          )
        };
        break;
        case "Not":
        data = {
          title:"Not Take Asseesment",
          isCount:false,
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
            <span className="counter">{data.isCount}{count}</span>
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