import React from 'react'
import './announcement.scss'
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const Annoucement = () => {
  return (
   <div className="announce">
            <Sidebar/>
            <div className="announceContainer">
                <Navbar/>
                <p>Announce</p>
            </div>
   </div>
  )
}

export default Annoucement