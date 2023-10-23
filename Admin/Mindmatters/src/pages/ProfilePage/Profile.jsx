import React,  { useEffect, useState, useRef } from "react";
import './profile.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from "axios";
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import storage from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
const Profile = () => {

  const [userData, setUserData] = useState({});
  const [image, setImage] = useState('');

  const input = () => toast.warn('Please Fill-out the Field', {
  });

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUserData({ ...userData, image_file: selectedFile, user_id: localStorage.getItem('ID') });
  };
  
  //Fetch Id
  useEffect(() => {
    const userId = localStorage.getItem('ID');
    fetch(`https://mindmatters-ejmd.onrender.com/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  //Upload
  const Upload = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('ID');
    // Check if there is a selected file and user_id
    if (userData.image_file && userId) {
      const imagePath = `profileImages/${userId}/${userData.image_file.name}`;
      const storageRef = ref(storage, imagePath);
      const uploadTask = uploadBytesResumable(storageRef, userData.image_file);
  
      uploadTask.on("state_changed", null, (error) => {
        console.error("Error uploading image: ", error);
      }, () => {
        // Image uploaded successfully, now get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImage(downloadURL);
            console.log("Image uploaded to Firebase Storage:", downloadURL);
  
            // Update the user's profile image path in the database
            axios
              .put(`https://mindmatters-ejmd.onrender.com/Upload/${userId}`, { image: downloadURL })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
            alert('Image uploaded successfully');
            window.location.reload();
          });
      });
    } else {
      alert('No file selected');
    }
  };
  
  //Update
  const Update = async (e) => {
    const userId = localStorage.getItem('ID');
    e.preventDefault();

    
    if (!values.fullname ||!values.username || !values.email || !values.phone || !values.address) {
      input();
       return;
     }
   

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
               {/*Warning Toast*/}
   <ToastContainer
  position="top-center"
  autoClose={1000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  className="warning" 
/>

      <div className="UserContainer">
        <div className="userShow">
      <div className="centerImage">
      <img
  alt="User Profile"
  className="userShowImg"
  src={userData.image_file} />

</div>
            
              <p className="DisplayInfo">{userData.Fullname}</p>
              <p className="DisplayInfo">{userData.position}</p>
               
              <div className="centerButton">
              <div className="txtfield">
              <label>Select profile</label>
                <input type='file'  id='outlined-basic'onChange={handleFileChange}/>
            </div>
            <Button className="UploadPicture" onClick={Upload}>Upload Picture</Button>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle"></span>
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