import React, { useEffect, useState,useRef } from 'react';
import './user.scss';
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

const User = () => {
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const [values, setValues] = useState({
    fullname: '',
    username: '',
    email: '',
    stud_no: '',
    password: '',
    phone: '',
    address: '',
  });
  const input = () => toast.warn('Please Fill-out the Field', {
  });
  const [open, setOpen] = React.useState(false);

  const handleOpen = (user) => {
    setSelectedUser(user.id);
    setOpen(true);
  };

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

const handleOpen2 = (user) => {
  setSelectedUserForModal(user);
  console.log(user)

  setOpen2(true);
};


const handleClose2 = () => {
  setSelectedUserForModal(null);
  setOpen2(false);
};

  const handleClose = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  const [isUpdateConfirmed, setIsUpdateConfirmed] = useState(false);

  useEffect(() => {
    fetch('https://mindmatters-ejmd.onrender.com/Student')
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  const rows = userList.map((user) => ({
    id: user.id,
    Fullname: user.Fullname,
    username: user.user_name,
    Email: user.Email,
    stud_no: user.stud_no,
    staus: user.staus,
    position: user.position,
    address: user.address,
    PhoneNumber: user.phone_number,
  }));

  const filteredRows = rows.filter((row) =>
  row.stud_no.toLowerCase().includes(searchInput.toLowerCase()) ||
  row.Fullname.toLowerCase().includes(searchInput.toLowerCase())
);


  const Updateuser = async (e) => {
    e.preventDefault();
  
    // Check if any of the fields are empty
    if (!values.fullname || !values.username || !values.stud_no || !values.email || !values.phone ||!values.address) {
      input();
    } else {
      const confirmUpdate = window.confirm('Are you sure you want to update this user?');
    
      if (confirmUpdate) {
        axios
          .put(`https://mindmatters-ejmd.onrender.com/userUpdate/${selectedUser}`, values)
          .then((res) => {
            console.log(res);
            alert('Success');
            setIsUpdateConfirmed(true);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    }
  };
  

  const Adduser = async (e) => {
    e.preventDefault();
  
    if (!values.username || !values.email || !values.stud_no || !values.password) {
     input();
      return;
    }
  
    const userConfirmed = window.confirm('Are you sure you want to add this user?');
    
    if (userConfirmed) {
      try {
        const response = await axios.post(`https://mindmatters-ejmd.onrender.com/register/app`, values);
        console.log(response);
        alert('Success');
        setIsUpdateConfirmed(true);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };
  

  const Deleteuser = async (user) => {
    const confirmDelete = window.confirm('Are you sure you want to Delete this user?');

    if (confirmDelete) {
      await axios
        .delete(`https://mindmatters-ejmd.onrender.com/userDelete/${user.id}`)
        .then((res) => {
          console.log(res);
          alert('Success');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  // View User Information
const [userId, setUserId] = useState(null);
const [userData, setUserData] = useState({
  Fullname: '',
  Username: '',
  Email: '',
  PhoneNumber: '',
  Address: '',
  StudentNo: '',
});

useEffect(() => {
  // Assuming you have the user ID available in the `userId` state
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://mindmatters-ejmd.onrender.com/user/${userId}`);
      const user = response.data;

      setUserData({
        Fullname: user.Fullname,
        Username: user.user_name,
        Email: user.Email,
        PhoneNumber: user.phone_number,
        Address: user.address,
        StudentNo: user.stud_no,
      });

      console.log(user);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  if (userId) {
    fetchUserData(userId); // Fetch user data if userId is available
  }
}, [userId]);
  

  //Printing the Documents
  const componentRef = useRef();
  const printData = useReactToPrint({
    content: () => componentRef.current,
    documentTitle : "Mind Matters User List",
    onAfterPrint : () => console.log('print success')
  })
   

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
        <Button className="modalBtn" variant="outlined" onClick={handleOpen1}>
          Add User
        </Button>
        <TextField
          className="search-bar"
          label="Search"
          variant="standard"
          style={{ marginLeft: '80%'}}
          
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        

        <div  style={{ width: '99%', padding: '10px' }}>
          <div style={{ height: 550, width: '100%' }}>
            <DataGrid
              ref={componentRef}
              rows={filteredRows}
              columns={[
                { field: 'id', headerName: 'ID', flex: 1 },
                { field: 'Fullname', headerName: 'Full Name', flex: 7 },
                { field: 'username', headerName: 'Username', flex: 3 },
                { field: 'Email', headerName: 'Email', flex: 5 },
                { field: 'stud_no', headerName: 'Student ID', flex: 5 },
                { field: 'position', headerName: 'Position', flex: 3 },
                {
                  field: 'actions',
                  headerName: 'Actions',
                  flex: 2,
                  renderCell: (params) => (
                    <div className="btns">
                      <IconButton onClick={() => handleOpen2(params.row)}>
                        <VisibilityIcon fontSize="inherit"/>
                      </IconButton>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <button onClick={printData}>Generate Report</button>

        {/* Modals for adding and editing users */}
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="box">
            <span className="userUpdateTitle">Add New User</span>
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
            <div className="txtfield">
              <TextField
                className="textBox"
                id="outlined-basic"
                label="Student ID"
                variant="outlined"
                onChange={(e) => setValues({ ...values, stud_no: e.target.value })}
              />
            </div>
            <br />
            <Button className="modalBtn" variant="outlined" onClick={Adduser}>
              Save
            </Button>
          </Box>
        </Modal>

        {/* Modals for editing users */}
        {/*<Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="box">
            <span className="userUpdateTitle">Edit User Information</span>
            <span className="txt">The information can be edited</span>
            {/* Edit user input fields
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
                id="outlined-basic"
                label="Student ID"
                variant="outlined"
                onChange={(e) => setValues({ ...values, stud_no: e.target.value })}
              />
            </div>
            <div className="txtfield">
              <TextField
                className="textBox"
                id="outlined-basic"
                label="Address"
                variant="outlined"
                onChange={(e) => setValues({ ...values, address: e.target.value })}
              />
            </div>
            <div className="txtfield">
              <TextField
                className="textBox"
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                onChange={(e) => setValues({ ...values, phone: e.target.value })}
              />
            </div>
            <br />
            <Button className="modalBtn" variant="outlined" onClick={Updateuser}>
              Save
            </Button>
          </Box>
        </Modal>/*}

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
            <span className="userUpdateTitle">Status: Pending</span>
            </div>
            <div className="txtfield">
            <span className="userUpdateTitle"><a href="https://firebasestorage.googleapis.com/v0/b/mindmatters-f0c04.appspot.com/o/profileImages%2F1%2FBaji.jpg?alt=media&token=1cdf1f21-c91e-4c6e-bb1c-0feb1881702e">Click here to view attachment</a></span> 
            </div>
            
          </div>


          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default User;