import React, { useState, useEffect } from 'react';
import './announcement.scss';
import Axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



const Annoucement = () => {
  const [Title, setTitle] = useState('');
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17T15:30'));

  const [announcements, setAnnouncements] = useState([]); 
  const [open, setOpen] = useState(false); // Initialize as false

  const [editAnnouncement, setEditAnnouncement] = useState({});

  const handleOpen = (announcement) => {
    setEditAnnouncement(announcement);
    setOpen(true);
  };

const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Fetch announcements from the backend API
    Axios.get('https://mindmatters-ejmd.onrender.com/announcement')
      .then((response) => {
        // Update the announcements state with the fetched data
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle other error scenarios if needed
      });
  }, []); // Empty dependency array means it runs once after the component mounts


  const input = () => toast.warn('Please Fill-out the Field', {
  });
  const Messagebtn = () => {
    if (Title === '' || what === '' || where == '') {
      input();
    } else {
      const formattedDate = selectedDate.format('YYYY-MM-DD HH:mm:ss');

      Axios.post('https://mindmatters-ejmd.onrender.com/announce', {
        title: Title,
        what: what,
        where: where,
        when: formattedDate,
      })
        .then((response) => {
          console.log(response);
          if (response.data.message === 'Server Error') {
            console.log('Server Error');
          } else if (response.data.message === 'Inserted') {
            console.log('Inserted');
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle other error scenarios if needed
        });
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setWhat(event.target.value);
  };

  const handleWhereChange = (event) => {
    setWhere(event.target.value);
  };

  const handleDateTimeChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleDeleteAnnouncement = (announcementId) => {
    Axios.delete(`http://localhost:5000/announcement/${announcementId}`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message === 'Deleted') {
            // Remove the deleted announcement from the local state
            setAnnouncements((prevAnnouncements) =>
              prevAnnouncements.filter((announcement) => announcement.id !== announcementId)
            );
          } else {
            console.log('Failed to delete announcement');
          }
        } else if (response.status === 404) {
          console.log('Announcement not found');
        } else {
          console.log('Unexpected error:', response.status);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle other error scenarios if needed
      });
  };

  // for editing modal
  const handleSaveChanges = () => {
    const confirmation = window.confirm('Are you sure you want to save the changes?');
  
    if (confirmation) {
      Axios.put(`http://localhost:5000/announcementEdit/${editAnnouncement.id}`, {
        title: editAnnouncement.title,
        what_announce: editAnnouncement.what_announce,
        where_announce: editAnnouncement.where_announce,
        when_announce: editAnnouncement.when_announce,
      })
        .then((response) => {
          console.log(response);
          if (response.data.message === 'Updated') {
            alert('Announcement updated successfully');
            // Close the modal after successfully updating the data
            setOpen(false);
            // You may also want to update the local state with the updated data if necessary
          }
        })
        .catch((error) => {
          // Handle the Axios error here and log it to the console
          console.error('Axios error:', error);
        });
    }
  };
  
  const handleEditChange = (event, field) => {
    const updatedAnnouncement = { ...editAnnouncement };
  
    if (field === 'when_announce' && event) {
      // Handle date field specifically
      updatedAnnouncement[field] = event.format('YYYY-MM-DD HH:mm:ss');
    } else {
      updatedAnnouncement[field] = event.target.value;
    }
    setEditAnnouncement(updatedAnnouncement);
  };
  
  
  
  

  return (
    <div className="announce" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Sidebar />
      <div className="announceContainer">

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
      <h2>Mental Health</h2>
        <h2>Announcement Form</h2>
        <form className="announcementForm">
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              margin="normal"
              className="txtWidth"
              value={Title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="About What?"
              variant="outlined"
              margin="normal"
              className="txtWidth"
              value={what}
              multiline={true} // Set to true to make it multi-line
              rows={4} // Specify the number of rows
              onChange={handleMessageChange}
            />
          </div>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Where it will be held?"
              className="txtWidth"
              variant="outlined"
              margin="normal"
              value={where}
              onChange={handleWhereChange}
            />
          </div>
          <div className="form-group">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateTimeChange}
                className="txtWidth"
                margin="normal"
              />
            </LocalizationProvider>
          </div>
          <div className="form-group">
          <Button variant="elevated" margin="auto" onClick={() => Messagebtn()}>Submit</Button>
          </div>
        </form> 
        <div className="announcementsContainer">
          <h2>Announcements</h2>
          <div className="announcementRows">
            {announcements.map((announcement, index) => (
             <div className="announcementContainer" key={announcement.id}>
             <strong>Title:</strong> {announcement.title}<br />
             <strong>What:</strong> {announcement.what_announce}<br />
             <strong>When:</strong> {announcement.when_announce}<br />
             <strong>Where:</strong> {announcement.where_announce}<br />
             <div className="iconContainer">
  <IconButton
    edge="end"
    aria-label="delete"
    onClick={() => handleDeleteAnnouncement(announcement.id)}
    className="deleteIcon"
  >
    <DeleteIcon />
  </IconButton>
  <IconButton
    edge="start"
    aria-label="edit"
    className="editIcon"
    onClick={() => handleOpen(announcement)}
  >
    <EditIcon />
  </IconButton>
</div>
           </div>
            ))}
            {announcements.map((announcement, index) => (
              ((index + 1) % 3 === 0) && <div className="rowDivider" key={`divider-${index}`} />
            ))}
          </div>
        </div>
      </div>

      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box className="box" style={{ width: '700px', height: '650px' }}>
            <span className="userUpdateTitle">Edit Announcement</span>
            <span className="txt">The information can be edited</span>
         
            <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              margin="normal"
              className="txtWidth"
             onChange={(event) => handleEditChange(event, 'title')}
            />
          </div>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="About What?"
              variant="outlined"
              margin="normal"
              className="txtWidth"
              multiline={true} // Set to true to make it multi-line
              rows={4} // Specify the number of rows
              onChange={(event) => handleEditChange(event, 'what_announce')}
            />
          </div>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Where it will be held?"
              className="txtWidth"
              variant="outlined"
              margin="normal"
              onChange={(event) => handleEditChange(event, 'where_announce')}
            />
          </div>
          <div className="form-group">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Select Date"
                onChange={(newValue) => handleEditChange(newValue, 'when_announce')}
                className="txtWidth"
                margin="normal"
              />
            </LocalizationProvider>
          </div>
            <br />
            <Button className="modalBtn" variant="outlined" onClick={() => handleSaveChanges()}>
              Save
            </Button>
          </Box>
        </Modal>

    </div>
  );
};

export default Annoucement;
