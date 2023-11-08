import React, { useEffect, useState,useRef } from 'react';
import './admin.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ToastContainer, toast } from 'react-toastify';
import {useReactToPrint} from 'react-to-print';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';



const admin = () => {
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const [values, setValues] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const input = () => toast.warn('Please Fill-out the Field', {
  });
  const [open, setOpen] = React.useState(false);



  const [open1, setOpen1] = React.useState(false);

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setSelectedUser(null);
    setOpen1(false);
  };

const [open2, setOpen2] = React.useState(false);
const [selectedUserForModal, setSelectedUserForModal] = React.useState(null);




const handleClose2 = () => {
  setSelectedUserForModal(null);
  setOpen2(false);
};


  const [isUpdateConfirmed, setIsUpdateConfirmed] = useState(false);

  useEffect(() => {
    fetch('https://mindmatters-ejmd.onrender.com/admin')
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  const rows = userList.map((user) => ({
    id: user.id,
    Profile: user.image_file,
    Fullname: user.Fullname,
    username: user.user_name,
    Email: user.Email,
    position: user.position,
  }));

  const filteredRows = rows.filter((row) =>
  row.Fullname.toLowerCase().includes(searchInput.toLowerCase())
);


  

const Adduser = async (e) => {
    e.preventDefault();
  
    if (!values.fullname || !values.username || !values.email || !values.password) {
      input();
      return;
    }
  
    const userConfirmed = window.confirm('Are you sure you want to add this user?');
  
    if (userConfirmed) {
      try {
        axios.post(`https://mindmatters-ejmd.onrender.com/register`, values).then((response) => {
          console.log(response.data); // Debugging: Check what the server sends
  
          if (response.data.message === 'Username already exists') {
            alert('Username Already Exists');
          } else if (response.data.message === 'Email already exists') {
            alert('Email Already Exists');
          } else if (response.data.message === 'User registered successfully') {
            alert('Success Registered');
            setIsUpdateConfirmed(true);
            window.location.reload();
          } else {
            // Handle any other response cases here
            console.log('Unexpected response:', response.data);
            alert('Unexpected response');
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  };
  
  



  // View User Information
const [userId, setUserId] = useState(null);
const [userData, setUserData] = useState();

useEffect(() => {
  // Assuming you have the user ID available in the `userId` state
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://mindmatters-ejmd.onrender.com/user/${userId}`);
      const user = response.data;
      setUserData(user);
      console.log(user);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  if (userId) {
    fetchUserData(userId); // Fetch user data if userId is available
  }
}, [userId]);
  

  return (
    <div className="user">
      <Sidebar />
      <div className="userContainer">
        <br/>
        <br/>
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
    <div style={{ width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items vertically
    padding: '16px', // Add some padding
    borderRadius: '8px', }}>
        <Button className="modalBtn" variant="outlined" onClick={handleOpen1}>
          Create new Admin
        </Button>
        <TextField
          className="search-bar"
          label="Search"
          placeholder='Search User here..'
          variant="standard"
          style={{width:500}}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        </div>
        

        <div  style={{ width: '99%', padding: '10px' }}>
          <div style={{ height: 700, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={[
                { field: 'Fullname', headerName: 'Full Name', flex: 7 },
                { field: 'username', headerName: 'Username', flex: 3 },
                { field: 'Email', headerName: 'Email', flex: 5 },
                { field: 'position', headerName: 'Position', flex: 3 },
              ]}
            />
          </div>
        </div>
     

        {/* Modals for adding and editing users */}
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="box">
            <span className="userUpdateTitle">Add New Admin</span>
            <span className="txt">The information can be edited</span>
            {/* Add user input fields */}
            <div className="txtfield">
              <TextField
                className="textBox"
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                onChange={(e) => setValues({ ...values, fullname: e.target.value })}
              />
            </div>
            <div className="txtfield">
              <TextField
                className="textBox"
                id="outlined-basic"
                label="Username"
                variant="outlined"
                name="user_name"
                onChange={(e) => setValues({ ...values, username: e.target.value })}
              />
            </div>
            <div className="txtfield">
              <TextField
                className="textBox"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
            </div>
            <div className="txtfield">
              <TextField
                className="textBox"
                type="password"
                id="outlined-password-input"
                label="Password"
                margin="normal"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </div>
            <br />
            <Button className="modalBtn" variant="outlined" onClick={Adduser}>
              Save
            </Button>
          </Box>
        </Modal>

        {/* Modals for viewing users */}
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="box">
           
	        <span className="userUpdateTitle">User Information</span>
          <span className="txt">The information can be edited</span>
          <div className="FormInput">
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Fullname" variant="outlined"   margin="normal" value={selectedUserForModal ? selectedUserForModal.Fullname : ''} InputLabelProps={{shrink: true,}} />
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Username" variant="outlined"   margin="normal" value={selectedUserForModal ? selectedUserForModal.username : ''} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Email Address" variant="outlined"   margin="normal" value={selectedUserForModal ? selectedUserForModal.Email : ''} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Phone number" variant="outlined"   margin="normal" value={selectedUserForModal ? selectedUserForModal.PhoneNumber : ''} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Address" variant="outlined"   margin="normal" value={selectedUserForModal ? selectedUserForModal.address : ''} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <TextField id="outlined-basic" className="custom-width" label="Student No" variant="outlined"   margin="normal" value={selectedUserForModal ? selectedUserForModal.stud_no : ''} InputLabelProps={{shrink: true,}}/>
            </div>
            <div className="txtfield">
            <span className="userUpdateTitle">
  Status: <span style={{ color: selectedUserForModal ? (selectedUserForModal.Verified === 1 ? 'green' : (selectedUserForModal.Verified === 0 ? 'black' : 'red')) : 'black', fontSize: 22 }}>
    {selectedUserForModal ? (selectedUserForModal.Verified === 1 ? "Verified" : (selectedUserForModal.Verified === 0 ? "Pending" : "Not Verified")) : "Pending"}
  </span>
</span>


          </div>
            <div className="txtfield">
            <span className="userUpdateTitle">
  <a href={selectedUserForModal ? selectedUserForModal.attachment : ''} target="_blank">
    Click here to view attachment
  </a>
</span>

            </div>
            
          </div>


          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default admin;