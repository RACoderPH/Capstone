import React from 'react'
import './assessment.scss'
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const Assessment = () => {
  return (
    <div className="assessment">
      <Sidebar/>
      <div className="assessmentContainer">
        <Navbar/>

        <p>Assessment</p>
      </div>
    </div>
  )
}

export default Assessment