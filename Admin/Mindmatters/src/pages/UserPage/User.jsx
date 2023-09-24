import React, { useEffect, useState } from 'react';
import './user.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from "axios";

const User = () => {
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [user, setUserData] = useState({});
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [values, setValues] = useState({
    fullname: null,
    username: null,
    email: null,
    stud_no: null,
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = (user) => {
    // Set the selected user for editing when the "Edit" button is clicked
    setSelectedUser(user.id);
    setOpen(true);
  };

  const handleClose = () => {
    // Clear the selectedUser state to exit edit mode
    setSelectedUser(null);
    setOpen(false);
  };

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('http://localhost:5000/api/getuser')
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  const Updateuser = async (e) => {
    e.preventDefault();

    // Show a confirmation dialog
    const confirmUpdate = window.confirm('Are you sure you want to update this user?');
  
    if (confirmUpdate) {
      axios
        .put(`http://localhost:5000/userUpdate/${selectedUser}`, values)
        .then((res) => {
          console.log(res);
          alert('Success');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="user">
      <Sidebar />
      <div className="userContainer">
        <br />
        <br />
        <Button className="modalBtn" variant="outlined" >Add User</Button>
        <div className="listContainer">   
          <table style={{ flex: 1 }}>
            <thead>
              <tr>
                <th>Full name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Status</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.Fullname}</td>
                  <td>{user.user_name}</td>
                  <td>{user.Email}</td>
                  <td>{user.stud_no}</td>
                  <td>{user.staus}</td>
                  <td>{user.position}</td>
                  <td className="btns">
                    <button onClick={() => handleOpen(user)}>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="box">
          <TextField
              className="textBox"
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
          
              onChange={(e) => setValues({ ...values, fullname: e.target.value })}
            />
            <TextField
              className="textBox"
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name="user_name"
           
              onChange={(e) => setValues({ ...values, username: e.target.value })}
            />
            <TextField
              className="textBox"
              id="outlined-basic"
              label="Email"
              variant="outlined"
             
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <TextField
              className="textBox"
              id="outlined-basic"
              label="Student ID"
              variant="outlined"
            
              onChange={(e) => setValues({ ...values, stud_no: e.target.value })}
            />
            <br />
            <Button className="modalBtn" variant="outlined" onClick={Updateuser}>
              Save
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default User;
