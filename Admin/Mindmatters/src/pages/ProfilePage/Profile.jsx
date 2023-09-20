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
    fetch(`https://mindmatters-ejmd.onrender.com/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  const Update = () =>{

  }

  return (
    <div className="profile">
        <Sidebar/>
            <div className="profileContainer">
                <Navbar/>

      <div className="container">        
      <h1 className="colTitle">Account</h1>

      <div className="UserContainer">
        <div className="userShow">
        <div className="centerImage">
                <img
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100"
                  alt=""
                  className="userShowImg"
                />
              </div>
            
              <p className="DisplayInfo">{userData.Fullname}</p>
              <p className="DisplayInfo">{userData.position}</p>
              <p className="DisplayInfo">{userData.created_at}</p>
               
              <div className="centerButton">
            <Button className="UploadPicture">Upload Picture</Button>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Profile</span>
          <span className="txt">The information can be edited</span>
          <div className="FormInput">
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Fullname" variant="outlined"   margin="normal" value={userData.Fullname} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Username" variant="outlined"   margin="normal"  value={userData.user_name} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Email Address" variant="outlined"   margin="normal"  value={userData.Email} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Phone number" variant="outlined"   margin="normal"  value={userData.Fullname} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Address" variant="outlined"   margin="normal"  value={userData.Fullname} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Firstname" variant="outlined"   margin="normal"  value={userData.Fullname} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Firstname" variant="outlined"   margin="normal"  value={userData.Fullname} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Firstname" variant="outlined"   margin="normal"  value={userData.Fullname} InputLabelProps={{shrink: true,}}/>
            </div>
           
          </div>
          <Button onClick={console.log("Press")}>Submit</Button>
        </div>
      </div>

      </div>
    </div>
    </div>
  )
}

export default Profile