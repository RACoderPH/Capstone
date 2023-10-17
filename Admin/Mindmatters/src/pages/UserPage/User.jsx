import React, { useEffect, useState } from 'react';
import './user.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const User = () => {
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const [values, setValues] = useState({
    fullname: null,
    username: null,
    email: null,
    stud_no: null,
    password: null,
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
  }));

  const filteredRows = rows.filter((row) =>
    row.stud_no.toLowerCase().includes(searchInput.toLowerCase())
  );

  const Updateuser = async (e) => {
    e.preventDefault();

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
  };

  const Adduser = async (e) => {
    e.preventDefault();

    const confirmUpdate = window.confirm('Are you sure you want to add this user?');

    if (confirmUpdate) {
      await axios
        .post(`https://mindmatters-ejmd.onrender.com/register/app`, values)
        .then((res) => {
          console.log(res);
          alert('Success');
          setIsUpdateConfirmed(true);
          window.location.reload();
        })
        .catch((err) => console.log(err));
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

  return (
    <div className="user">
      <Sidebar />
      <div className="userContainer">
        <br/>
        <br/>
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
        

        <div style={{ width: '99%', padding: '10px' }}>
          <div style={{ height: 550, width: '100%' }}>
            <DataGrid
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
                  flex: 4,
                  renderCell: (params) => (
                    <div className="btns">
                      <IconButton>
                        <VisibilityIcon></VisibilityIcon>
                      </IconButton>

                     <IconButton onClick={() => handleOpen(params.row)}>
                        <EditIcon fontSize="inherit"/>
                      </IconButton>
                      
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => Deleteuser(params.row)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  ),
                },
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="box">
            <span className="userUpdateTitle">Edit User Information</span>
            <span className="txt">The information can be edited</span>
            {/* Edit user input fields */}
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
