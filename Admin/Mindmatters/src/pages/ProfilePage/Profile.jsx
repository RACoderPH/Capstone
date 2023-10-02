import React,  { useEffect, useState } from "react";
import './profile.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from "axios";


const Profile = () => {
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [userData, setUserData] = useState({});
  
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange =  (e) =>{
    setUserData({...userData, image_file:  e.target.files[0]});
  };
  //Fetch Id
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
  //Upload
  const Upload = async (e) => {
    const userId = localStorage.getItem('ID');
    e.preventDefault();
  
    // Create a FormData object to send both data and file
    const formData = new FormData();
    formData.append('image_file', userData.image_file); // Use the image_file from userData
  
    // Show a confirmation dialog
    const confirmUpdate = window.confirm('Are you sure you want to update this user?');
  
    if (confirmUpdate) {
      axios
        .put(`https://mindmatters-ejmd.onrender.com/Upload/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
          },
        })
        .then((res) => {
          console.log(res);
          alert('Success');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };
  //Update
  const Update = async (e) => {
    const userId = localStorage.getItem('ID');
    e.preventDefault();

    // Show a confirmation dialog
    const confirmUpdate = window.confirm('Are you sure you want to update this user?');
  
    if (confirmUpdate) {
      axios
        .put(`https://mindmatters-ejmd.onrender.com/profileUpdate/${userId}`, values)
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

      <div className="containers">        
      <h1 className="colTitle">Account</h1>

      <div className="UserContainer">
        <div className="userShow">
        <div className="centerImage">
               <img
               src={`https://mindmatters-ejmd.onrender.com/images/${userData.image_file}`}
               // Provide a default image URL
                  alt=""
                  className="userShowImg"
                />
              </div>
            
              <p className="DisplayInfo">{userData.Fullname}</p>
              <p className="DisplayInfo">{userData.position}</p>
              <p className="DisplayInfo">{userData.created_at}</p>
               
              <div className="centerButton">
              <div className="txtfield">
              <label>select profile</label>
                <input type='file'  id='outlined-basic'onChange={handleFileChange}/>
            </div>
            <Button className="UploadPicture" onClick={Upload}>Upload Picture</Button>
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
            <TextField id="outlined-basic" className="custom-width" label="Phone number" variant="outlined"   margin="normal"  value={userData.phone_number} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Address" variant="outlined"   margin="normal"  value={userData.address} InputLabelProps={{shrink: true,}}/>
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
            <span className="userUpdateTitle">Update Profile</span>
          <span className="txt">The information can be edited</span>
              <div className="txtfield-container">
            <div className="txtfield">
            <TextField className="textBox" id="outlined-basic" label="Full Name" variant="outlined" 
              onChange={(e) => setValues({ ...values, fullname: e.target.value })}/>
            </div>

            <div className="txtfield">
            <TextField className="textBox" id="outlined-basic" label="Username" variant="outlined" name="user_name" 
              onChange={(e) => setValues({ ...values, username: e.target.value })}/>
            </div>

            <div className="txtfield">
            <TextField className="textBox" id="outlined-basic" label="Email" variant="outlined" name="Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}/>
            </div>

            <div className="txtfield">
            <TextField className="textBox" id="outlined-basic" label="Phone Number" variant="outlined"
              onChange={(e) => setValues({ ...values, phone: e.target.value })} />
            </div>

            <div className="txtfield">
            <TextField className="textBox" id="outlined-basic" label="Address" variant="outlined" 
              onChange={(e) => setValues({ ...values, address: e.target.value })}/>
            </div>
            
            <br/>
            <Button className="modalBtn" variant="outlined" onClick={Update}>Save</Button>
            </div>
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