import React, { useState} from 'react';
import './announcement.scss'
import Axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const Annoucement = () => {

  const [Title,setTitle] = useState("")
  const [Message,setMessage] = useState("")

  const Messagebtn = () => {
        if(Title === "" && Message == ""){
            alert("Fill field");
        }else{
          Axios.post('http://localhost:5000/announce', {
            title: Title,
            message: Message,
          })
          .then((response) => {
            console.log(response);
            if (response.data.message === 'Server Error') {
              console.log("Server Error")
            }else if(response.data.message === 'Inserted'){
              console.log("Inserted")
            }
          })
          .catch((error) => {
            console.error(error);
            // Handle other error scenarios if needed
          });
  }
}

  return (
   <div className="announce">
        <Sidebar/>
            <div className="announceContainer">
          <Navbar/>
    <h2>Announcement Form</h2><br></br>
    <form className="announcementForm">
      <div className="form-group">
        <label>Title:</label>
        <input type="text" id="title" name="title" required
          onChange={(e) => {
            setTitle(e.target.value)
            }}/>
      </div>
      <div className="form-group">
        <label>Message:</label>
        <textarea id="message" name="message" required
         onChange={(e) => {
          setMessage(e.target.value)
          }}></textarea>
      </div>
      <div className="form-group">
        <label>Picture:</label>
        <input type="file" id="picture" name="picture"/>
      </div>
      <div className="form-group">
        <input type="submit" value="Submit" onClick={Messagebtn}/>
      </div>
    </form>
  </div>
      </div>
   
  )
}

export default Annoucement