import React,  { useEffect, useState } from "react";
import './profile.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublishIcon from '@mui/icons-material/Publish';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Profile = () => {
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [userData, setUserData] = useState({});
  

  useEffect(() => {
    const storedValue = localStorage.getItem('Username');
     // Retrieve the value from localStorage
    if (storedValue) {
      setLocalStorageValue(storedValue); // Update the component state with the retrieved value
    }
    

    const userId = localStorage.getItem('ID');
    fetch(`http://localhost:5000/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);


  return (
    <div className="profile">
        <Sidebar/>
            <div className="profileContainer">
                <Navbar/>

      <div className="container">        
      <h1 className="colTitle">Welcome Admin</h1>

      <div className="UserContainer">
        <div className="userShow">
          <div className="userShowTop">
          <div className="userUpdateUpload">
          <img className="userUpdateImg" src="https://www.famousbirthdays.com/faces/haerin-image.jpg" alt="" />
          <label htmlFor="file"><PublishIcon></PublishIcon></label>
          <input type="file" id="file" style={{ display: "none"}}></input>
        </div>
            <div className="userShowTopTitle">
              <span className="userShowUsername">{localStorageValue}</span>
              <span className="userShowUserTitle">Guidance Counselor</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
            <PermIdentityIcon className="userShowIcon"/>
            <span className="showUserInfoTitle">{userData.user_name}</span>
            </div>
            <div className="userShowInfo">
            <CalendarTodayIcon className="userShowIcon"/>
            <span className="showUserInfoTitle">{userData.created_at}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
            <PermContactCalendarIcon className="userShowIcon"/>
            <span className="showUserInfoTitle">+639-432-5235</span>
            </div>
            <div className="userShowInfo">
            <MailOutlineIcon className="userShowIcon"/>
            <span className="showUserInfoTitle">{userData.Email}</span>
            </div>
            <div className="userShowInfo">
            <LocationOnIcon className="userShowIcon"/>
            <span className="showUserInfoTitle">Pulilan, Bulacan</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form  className="userUpdateForm">
            <div className="userUpdateLeft">
          
            <div className="single-row">

              <div className="single-column">
              <div className="userUpdateItem">
              <TextField id="standard-basic" label="Username" variant="standard" 
               value={userData.user_name}  margin="dense"/>
              </div>
              </div>
              <div className="single-column">
              <div className="userUpdateItem">
              <TextField id="standard-basic" label="Fullname" variant="standard" 
              value={userData.user_name}  margin="dense"/>
              </div>
              </div>
              </div>

              <div className="userUpdateItem">
              <TextField id="standard-basic" label="Email" variant="standard" 
               value={userData.Email} margin="dense"/>
              </div>
      
              <div className="userUpdateItem">
              <TextField id="standard-basic" label="Phone" variant="standard" margin="dense" />
              </div>

              <div className="userUpdateItem">
              <TextField id="standard-basic" label="Pulilan, Bulacan" margin="dense" variant="standard" disabled
              size="small" defaultvalue="Small"/>
   
            </div>
            </div>
            <div className="userUpadateRight">
            <div className="userUpdateButton">
            <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            href="#file-upload" type="submit">

            Update
           
          </Button>
          </div>
            </div>
          </form>
        </div>
      </div>

      </div>

      


    </div>
    </div>
  )
}

export default Profile