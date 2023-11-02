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
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
    Profile: user.image_file,
    Fullname: user.Fullname,
    username: user.user_name,
    Email: user.Email,
    stud_no: user.stud_no,
    status: user.status,
    position: user.position,
    address: user.address,
    PhoneNumber: user.phone_number,
    attachment: user.attachment,
    Verified:user.Verified,
  }));

  const filteredRows = rows.filter((row) =>
  row.stud_no.toLowerCase().includes(searchInput.toLowerCase()) ||
  row.Fullname.toLowerCase().includes(searchInput.toLowerCase()) ||
  (row.Verified === 0 && searchInput.toLowerCase() === 'pending') ||
  (row.Verified === 1 && searchInput.toLowerCase() === 'verified') ||
  (row.Verified === 2 && searchInput.toLowerCase() === 'not verified')
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
  

  //Printing the Documents
  const componentRef = useRef();
  const printData = useReactToPrint({
    content: () => componentRef.current,
    documentTitle : "Mind Matters User List",
    onAfterPrint : () => console.log('print success')
  })


  //Verifie the user
  const verifyUser = (userId) => {
    const confirmVerify = window.confirm('Are you sure you want to verify this user?');
    if (confirmVerify) {
      axios
        .put(`http://localhost:5000/VerifyUser/${userId}`)
        .then((res) => {
          console.log(res);
          // Handle success (e.g., show a success message)
          alert('User verified successfully');
          // Refresh the user list or perform any other necessary actions
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
          // Handle the error (e.g., show an error message)
          alert('Error verifying user');
        });
    }
  };
  
//Not Verified User
  const NotverifyUser = (userId) => {
    const confirmVerify = window.confirm('Are you sure you want to Declined this user?');
    if (confirmVerify) {
      axios
        .put(`http://localhost:5000/NotVerifyUser/${userId}`)
        .then((res) => {
          console.log(res);
          // Handle success (e.g., show a success message)
          alert('User Declined successfully');
          // Refresh the user list or perform any other necessary actions
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
          // Handle the error (e.g., show an error message)
          alert('Error verifying user');
        });
    }
  };

  //Change Verified to 0
  const Change = (userId) => {
    const confirmVerify = window.confirm('Are you sure you want to Change this user?');
    if (confirmVerify) {
      axios
        .put(`http://localhost:5000/Change/${userId}`)
        .then((res) => {
          console.log(res);
          // Handle success (e.g., show a success message)
          alert('Verified Change successfully');
          // Refresh the user list or perform any other necessary actions
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
          // Handle the error (e.g., show an error message)
          alert('Error verifying user');
        });
    }
  };

  const convertImageToBase64 = (imageSrc, callback) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // To enable cross-origin loading of images
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      callback(canvas.toDataURL('image/png'));
    };
    img.src = imageSrc;
  };
  const [logoImage, setLogoImage] = useState(null);
  useEffect(() => {
    // Convert the logo image to base64
    convertImageToBase64('src/images/sdalogo.png', (logoImageDataUrl) => {
      setLogoImage(logoImageDataUrl);
    });
  }, []); // Use an empty dependency array to ensure it runs only once
  
  const [moFranciscaImage, setMoFranciscaImage] = useState(null);
  
  useEffect(() => {
    // Convert the moFrancisca image to base64
    convertImageToBase64('src/images/mofrancisca.png', (moFranciscaImageDataUrl) => {
      setMoFranciscaImage(moFranciscaImageDataUrl);
    });
  }, []);

  const createPdf = () => {
    // Define the table headers
    const tableHeaders = ['Full Name', 'Username', 'Email', 'Student ID'];
  
    // Create a table body with data rows
    const tableBody = userList.map((user) => [
      { text: user.Fullname, style: 'data' },
      { text: user.user_name, style: 'data' },
      { text: user.Email, style: 'data' },
      { text: user.stud_no, style: 'data' },
    ]);
  
    // Define the table layout
    const tableLayout = {
      hLineWidth: function (i, node) {
        return i === 0 || i === 1 || i === node.table.body.length ? 2 : 1;
      },
      vLineWidth: function (i, node) {
        return i === 0 || i === node.table.widths.length ? 2 : 1;
      },
      hLineColor: function (i, node) {
        return i === 0 || i === 1 || i === node.table.body.length ? 'black' : 'gray';
      },
      vLineColor: function (i, node) {
        return i === 0 || i === node.table.widths.length ? 'black' : 'gray';
      },
      paddingLeft: function (i, node) {
        return 4;
      },
      paddingRight: function (i, node) {
        return 4;
      },
    };
    const tableWidths = ['auto', 'auto', 'auto', 'auto'];
    // Capture the PieChart as an image
    const content = [
      {
        columns: [
          {
            image: logoImage,
            width: 70,
            alignment: 'left',
          },
          {
            stack: [
              {
                text: 'St. Dominic Academy of Pulilan, Inc.',
                style: 'header',
                alignment: 'center',
              },
              {
                text: '(PAASCU Accredited - Level II)\nNational Road, Poblacion, Pulilan, Bulacan',
                style: 'italicHeader',
                alignment: 'center',
              },
            ],
          },
          {
            image: moFranciscaImage,
            width: 80,
            alignment: 'right',
          },
        ],
      },
      {
        text: ' ', // Add a blank line for margin
      },
      {
        text: ' ', // Add a blank line for margin
      },
      {
        text: 'Student List',
        style: 'header',
        alignment: 'center',
      },
      {
        table: {
          headerRows: 1,
          widths: tableWidths, // Use the custom column widths
          body: [tableHeaders, ...tableBody],
        },
        layout: tableLayout,
      },
    ];
  
    const styles = {
      header: {
        fontSize: 22,
        bold: true,
      },
      italicHeader: {
        italics: true,
        alignment: 'center',
      },
      data: {
        fontSize: 14,
      },
    };
  
    const docDefinition = {
      content,
      styles,
      pageSize: 'A4', // Set the paper size (A4 or other standard sizes)
      pageMargins: [40, 60, 40, 60], // Set page margins [left, top, right, bottom]
    };
    
  
    // Create and download the PDF
    pdfMake.createPdf(docDefinition).download('Mind_Matters_User_List.pdf');
  };
  

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
          Create new user
        </Button>
        <TextField
          className="search-bar"
          label="Search"
          variant="standard"
          style={{width:500}}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        </div>
        

        <div  style={{ width: '99%', padding: '10px' }}>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              ref={componentRef}
              rows={filteredRows}
              columns={[
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
                {field:'Verified', 
                headerName: 'Verified',flex:4,
                renderCell: (params) => (
                  <div className="btns">
                  {params.row.Verified === 0 && (
                    <>
                  <span style={{ color: 'green', fontSize: 16, marginRight: '8px',cursor:'pointer' }} onClick={() => verifyUser(params.row.id)}>Approve</span>
                  <span style={{ color: 'red', fontSize: 16, marginLeft: '8px',cursor:'pointer' }} onClick={() => NotverifyUser(params.row.id)}>Decline</span>
                    </>
                  )}
                
                  {params.row.Verified === 1 && (
                  <span style={{ color: 'green', fontSize: 20}}>Verified <sub style={{color:'black',fontSize:10,cursor:'pointer'}} onClick={() => Change(params.row.id)}>Change</sub></span>
                  )}
                
                  {params.row.Verified === 2 && (
                   <span style={{ color: 'red', fontSize: 20}}>Not Verified  <sub style={{color:'black',fontSize:10,cursor:'pointer'}}onClick={() => Change(params.row.id)}>Change</sub></span>
                  )}
                </div>
                
                ),
              },
              ]}
            />
          </div>
        </div>
        <button onClick={createPdf}>Download Pdf</button>

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

export default User;