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
    <h2>Announcement Form</h2><br></br>
    <form id="announcementForm">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required/>
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
      </div>
      <div class="form-group">
        <label for="picture">Picture:</label>
        <input type="file" id="picture" name="picture"/>
      </div>
      <div class="form-group">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  </div>
            </div>
   
  )
}

export default Annoucement