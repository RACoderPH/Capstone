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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [userData, setUserData] = useState({});
  
  const [values, setValues] = useState({
    fullname: null,
    username: null,
    email: null,
    phone: null,
    address: null,
 
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  
  const Update = async (e) => {
    const userId = localStorage.getItem('ID');
    e.preventDefault();
    
    // Show a confirmation dialog
    const confirmUpdate = window.confirm('Are you sure you want to update this user?');
  
    if (confirmUpdate) {
      axios
        .put(`http://localhost:5000/profileUpdate/${userId}`, values)
        .then((res) => {
          console.log(res);
          alert('Success');
        })
        .catch((err) => console.log(err));
    }
  };
  
  

  return (
    <div className="profile">
        <Sidebar/>
            <div className="profileContainer">

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
            <TextField id="outlined-basic" className="custom-width" label="Fullname" variant="outlined"   margin="normal" value={userData.Fullname} InputLabelProps={{shrink: true,}} />
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
          <Button onClick={handleOpen}>Edit Info</Button>         
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="box" >
            <TextField className="textBox" id="outlined-basic" label="Full Name" variant="outlined" 
              onChange={(e) => setValues({ ...values, fullname: e.target.value })}/>
              
            <TextField className="textBox" id="outlined-basic" label="Username" variant="outlined" name="user_name" 
              onChange={(e) => setValues({ ...values, username: e.target.value })}/>

            <TextField className="textBox" id="outlined-basic" label="Email" variant="outlined" name="Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}/>

            <TextField className="textBox" id="outlined-basic" label="Phone Number" variant="outlined"
              onChange={(e) => setValues({ ...values, phone: e.target.value })} />

            <TextField className="textBox" id="outlined-basic" label="Address" variant="outlined" 
              onChange={(e) => setValues({ ...values, address: e.target.value })}/>
          
            <br/>
            <Button className="modalBtn" variant="outlined" onClick={Update}>Save</Button>
              </Box>
          </Modal>
              
        </div>      
      </div>
      
      </div>
      
    </div>
  
    </div>
  )
}


export default Profile