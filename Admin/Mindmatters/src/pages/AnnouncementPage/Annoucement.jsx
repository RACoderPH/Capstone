import React, { useState } from 'react';
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



const Annoucement = () => {
  const [Title, setTitle] = useState('');
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17T15:30'));

  const Messagebtn = () => {
    if (Title === '' || what === '' || where == '') {
      alert('Fill fields');
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

  return (
    <div className="announce" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Sidebar />
      <div className="announceContainer">
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
      </div>
    </div>
  );
};

export default Annoucement;
