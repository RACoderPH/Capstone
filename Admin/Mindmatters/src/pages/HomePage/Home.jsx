import React, { useEffect, useState, useRef } from "react";
import './home.scss';
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Widget from "../../components/Widget/Widget";
import Chart from "../../components/Chart/Chart";
import User from "../UserPage/User";
import axios from "axios";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Tooltip,
} from "recharts";
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import DeleteIcon from '@mui/icons-material/Delete';




function Home() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [Stress, setStress] = useState(null);
  const [Anxiety, setAnxiety] = useState(null);
  const [Depression, setDepression] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedMood, setSelectedMood] = useState("Select");
  const [userMoods, setUserMoods] = useState({});

  const [stressData, setStressData] = useState(0);
  const [anxietyData, setAnxietyData] = useState(0);
  const [depressionData, setDepressionData] = useState(0);

  const [data, setData] = useState([
    { name: "Stress", value: Stress },
    { name: "Anxiety", value: Anxiety },
    { name: "Depression", value: Depression },
  ]);

  useEffect(() => {
      if(!localStorage.getItem('Username')){
        navigate('/');
      }
  },[]);


  const handleViewClick = (userId) => {
    setSelectedUserId(userId);
    handleOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mindmatters-ejmd.onrender.com/api/getuser');
        setUserList(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if (selectedUserId !== null) {
      axios
        .get(`https://mindmatters-ejmd.onrender.com/student_result/${selectedUserId}`)
        .then((response) => {
          const resultDataArray = response.data;
          console.log('Assessment Result Data (Raw):', resultDataArray);

          if (resultDataArray.length > 0) {
            const { stress, anxiety, depression } = resultDataArray[0];

            const dataForPieChart = [
              { name: "Stress", value: stress },
              { name: "Anxiety", value: anxiety },
              { name: "Depression", value: depression },
            ];

            setStressData(stress);
            setAnxietyData(anxiety);
            setDepressionData(depression);
            setData(dataForPieChart);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch assessment result data:', error);
        });
    }
  }, [selectedUserId]);

  const componentRef = useRef();
  const printData = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Mind Matters User List",
    onAfterPrint: () => console.log('print success')
  });

  const chartRef = useRef();
  const [chartImage, setChartImage] = useState(null);
  const [isPieChartLoaded, setIsPieChartLoaded] = useState(false);
  const [isChartLoaded, setIsChartLoaded] = useState(false);

  const handleChartLoad = () => {
    setIsPieChartLoaded(true);
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
  convertImageToBase64('/sdalogo.png', (logoImageDataUrl) => {
    setLogoImage(logoImageDataUrl);
  });
}, []); // Use an empty dependency array to ensure it runs only once

const [moFranciscaImage, setMoFranciscaImage] = useState(null);

useEffect(() => {
  // Convert the moFrancisca image to base64
  convertImageToBase64('/mofrancisca.png', (moFranciscaImageDataUrl) => {
    setMoFranciscaImage(moFranciscaImageDataUrl);
  });
}, []);

pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  },
  LogoImage: {
    normal: logoImage,
  },
  MoFranciscaImage: {
    normal: moFranciscaImage,
  },
}; 

const createPdf = () => {
  // Capture the PieChart as an image
  html2canvas(document.querySelector('.PieChart')).then((canvas) => {
    const chartImage = canvas.toDataURL('image/jpeg');
    
    if (selectedUserId !== null) {
      const selectedUser = userList.find((user) => user.id === selectedUserId);

      if (selectedUser) {
        const { Fullname, stud_no } = selectedUser;

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
            text: 'Mental Health Assessment Report',
            style: 'header',
            alignment: 'center',
          },
          {
            text: 'Mental Health Assessment Report',
            style: 'italicHeader',
            alignment: 'center',
          },
          {
            text: ' ', // Add a blank line for margin
          },
          {
            text: ' ', // Add a blank line for margin
          },
          {
            text: ' ', // Add a blank line for margin
          },
          {
            text: `Fullname: ${Fullname}`,
            style: 'dataList',
            alignment: 'left',
          },
          {
            text: `Student ID: ${stud_no}`,
            style: 'dataList',
            alignment: 'left',
          },
          {
            image: chartImage,
            width: 400,
            alignment: 'center',
          },
          {
            text: ' ', // Add a blank line for margin
          },
           // Add a section for notes
    {
      text: 'Notes:',
      style: 'header', // You can define a new style for the header if needed
    },
    {
      ul: notes.map((note) => ({
        text: note.notes,
        style: 'noteItem', // You can define a new style for note items
      })),
    },
    {
      text: ' ', // Add a blank line for margin
    },
    {
      table: {
        body: [
          [
            { text: 'Results', style: 'header', colSpan: 2, alignment: 'center' },
            {}
          ],
          [
            { text: 'Stress', style: 'dataList' },
            {
              text: `${stressData} : ${getSeverity(stressData, 'stress')}`,
              style: { background: getBackgroundColor(stressData, 'stress') }
            }
          ],
          [
            { text: 'Anxiety', style: 'dataList' },
            {
              text: `${anxietyData} : ${getSeverity(anxietyData, 'anxiety')}`,
              style: { background: getBackgroundColor(anxietyData, 'anxiety') }
            }
          ],
          [
            { text: 'Depression', style: 'dataList' },
            {
              text: `${depressionData} : ${getSeverity(depressionData, 'depression')}`,
              style: { background: getBackgroundColor(depressionData, 'depression') }
            }
          ]
        ],
        widths: ['auto', '*'],
        alignment: 'center'
      },
    }
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
            fontSize: 16,
            alignment: 'center',
          },
          dataList: {
            fontSize: 16,
            alignment: 'center',
          },
        };

        const docDefinition = {
          content,
          styles,
        };

        const pdfName = `Mind_Matters_Report_${stud_no}.pdf`;
        // Create and download the PDF
        pdfMake.createPdf(docDefinition).download(pdfName);
      }
    }
  });
};

  
  // Helper function to get the severity
  function getSeverity(value, type) {
    if (type === 'stress') {
      if (value >= 34) return "Extreme Severe";
      if (value >= 26) return "Severe";
      if (value >= 19) return "Moderate";
      if (value >= 15) return "Mild";
      if (value >= 0) return "Normal";
      return '';
    } else if (type === 'anxiety') {
      if (value >= 20) return "Extreme Severe";
      if (value >= 15) return "Severe";
      if (value >= 10) return "Moderate";
      if (value >= 8) return "Mild";
      if (value >= 0) return "Normal";
      return '';
    } else if (type === 'depression') {
      if (value >= 28) return "Extreme Severe";
      if (value >= 21) return "Severe";
      if (value >= 14) return "Moderate";
      if (value >= 10) return "Mild";
      if (value >= 0) return "Normal";
      return '';
    }
  }
  
  // Helper function to get the severity background color
function getBackgroundColor(value, type) {
  if (type === 'stress') {
    if (value >= 34) return '#F7A4A4';
    if (value >= 26) return '#F57328';
    if (value >= 19) return '#FFE9A0';
    if (value >= 15) return '#EFF669';
    if (value >= 0) return '#B6E2A1';
    return 'white';
  } else if (type === 'anxiety') {
    if (value >= 20) return '#F7A4A4';
    if (value >= 15) return '#F57328';
    if (value >= 10) return '#FFE9A0';
    if (value >= 8) return '#EFF669';
    if (value >= 0) return '#B6E2A1';
    return 'white';
  } else if (type === 'depression') {
    if (value >= 28) return '#F7A4A4';
    if (value >= 21) return '#F57328';
    if (value >= 14) return '#FFE9A0';
    if (value >= 10) return '#EFF669';
    if (value >= 0) return '#B6E2A1';
    return 'white';
  }
}
  
  // for adding note
  const [note, setNote] = useState(''); // Step 1: Add a state variable for the note
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const addNote = async (e) => {
    e.preventDefault();

    const noteConfirmed = window.confirm('Are you sure you want to add this note?');

    if (noteConfirmed) {
      try {
        // Send the note data to the server
        const response = await axios.post('https://mindmatters-ejmd.onrender.com/addNote', {
          notes: note, // Send the note from the state variable
          user_id: selectedUserId, // Assuming you have a selectedUserId
        });

        console.log(response);
        alert('Success');
        window.location.reload();
        setNotes((prevNotes) => [...prevNotes, { notes: note }]);
        setNote('');
        // After adding a note, re-fetch the notes
      fetchNotes(selectedUserId); // Make sure to call the fetchNotes function
      } catch (err) {
        console.error(err);
      }
    }
  };

  // for fetching note
  const [notes, setNotes] = useState([]); // Step 1: Create a state variable for notes
  const handleViewClickNote = (userId) => {
    setSelectedUserId(userId);
    handleOpen();
    
  };

  useEffect(() => {
    if (selectedUserId !== null) {
      axios
        .get(`https://mindmatters-ejmd.onrender.com/getNotes/${selectedUserId}`)
        .then((response) => {
          setNotes(response.data); // Set the notes in the state
          console.log("Fetched Notes:", response.data); // Log the notes here
        })
        .catch((error) => {
          console.error('Failed to fetch notes:', error);
        });
    }
  }, [selectedUserId]);

  //for deleting notes
  const handleDeleteNote = async (noteId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
  
    if (confirmDelete) {
      try {
        // Send a DELETE request to the server to delete the note
        const response = await axios.delete(`https://mindmatters-ejmd.onrender.com/deleteNote/${noteId}`);
  
        if (response.status === 200) {
          // Remove the deleted note from the state
          setNotes((prevNotes) => prevNotes.filter((note) => note.notes_id !== noteId)); // Use the correct property for filtering
          console.log('Note deleted successfully');
        } else {
          console.log('Failed to delete the note');
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  // for span of notes
  const listItemStyles = {
    fontSize: '20px', // Adjust the font size as needed
  };


  // Function to handle mood change
  const handleMoodChange = (event, selectedUserId) => {
    const newMood = event.target.value;
    console.log(newMood); // Add this line to log the selected mood
    console.log('Selected Mood:', newMood); // Add this line
  
    // Update the user's mood in the database
    console.log('Selected Mood (Before Request):', newMood); // Add this line
    updateMoodStatus(selectedUserId, newMood);
  
    // Store the selected mood in localStorage
    console.log(`Stored mood for user ${selectedUserId}: ${newMood}`);

  
    // Update the local state
    setUserMoods((prevMoods) => ({
      ...prevMoods,
      [selectedUserId]: newMood,
    }));
    // Update the local state
  setSelectedMood(newMood); // Update the selectedMood state variable
  
  };


  const updateMoodStatus = (selectedUserId, newMood) => {
    axios
      .put(`https://mindmatters-ejmd.onrender.com/updateMoodStatus/${selectedUserId}`, {
        mood: newMood, // Use the newMood variable instead of selectedMood
      })
      .then((response) => {
        console.log("Mood status updated:", response.data.message);
        window.location.reload();

      })
      .catch((error) => {
        console.error('Failed to update mood status:', error);
      });
  };

  useEffect(() => {
    // After the component mounts, check localStorage for selected moods
    const userMoodFromLocalStorage = localStorage.getItem(`selectedMood-${selectedUserId}`);
    console.log(`Retrieved mood for user ${selectedUserId}: ${userMoodFromLocalStorage}`);
    if (userMoodFromLocalStorage) {
      setUserMoods((prevMoods) => ({
        ...prevMoods,
        [selectedUserId]: userMoodFromLocalStorage,
      }));
      setSelectedMood(userMoodFromLocalStorage); // Update the selectedMood state variable
    }
  }, [selectedUserId]);


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="User" />
          <Widget type="Take" />
          <Widget type="Not" />
        </div>

        <div className="charts">
          <Chart />
        </div>

        <div className="listContainer">
          <table style={{ flex: 1 }}>
            <thead>
              <tr>
                <th>Fullname</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Status</th>
                <th>Position</th>
                <th>Actions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.Fullname}</td>
                  <td>{user.user_name}</td>
                  <td>{user.Email}</td>
                  <td>{user.stud_no}</td>
                  <td>{user.status}</td>
                  <td>{user.position}</td>
                  <td className="btns">
                    <Button variant="outlined" onClick={() => handleViewClick(user.id)}>View</Button>
                  </td>
                  <td><select
                      value={user.mh_status}
                      onChange={(event) => handleMoodChange(event, user.id)}
                style={{
                background: 'none',  // Set the background to none (transparent)
                border: 'none',      // Remove the border
                outline: 'none',     // Remove the outline     // Change the text color
                padding: '5px',      // Add padding for spacing
             }}
>
  <option value="Select">{user.mh_status}</option>
  <option value="normal">Normal</option>
  <option value="stressed">Stressed</option>
  <option value="anxious">Anxious</option>
  <option value="depressed">Depressed</option>
</select>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="custom-modal" // Add a class for styling
      >
        <Box className="box">
          <div ref={componentRef}>
            <span className="userUpdateTitle">Mental Health Assessment Results</span>
            <span className="txt">The information can be edited</span>
            <div className="chart" >
              <PieChart ref={chartRef} className="PieChart" width={400} height={320}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx={200}
                  cy={200}
                  outerRadius={110}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                
              </PieChart>
            </div>
            <div className="result-placeholder">
              <h2>Results</h2>
              <ul>
                <li>Stress: {stressData} :
                  <span style={{
                    fontSize: 22,
                    borderRadius: 10,
                    padding: 4,
                    color: 'black',
                    backgroundColor: stressData >= 34 ? "#F7A4A4" :
                      stressData >= 26 ? "#F57328" :
                        stressData >= 19 ? "#FFE9A0" :
                          stressData >= 15 ? "#EFF669" :
                            stressData >= 0 ? "#B6E2A1" :
                              "white"
                  }}>
                    {stressData >= 34 ? "Extreme Severe" :
                      stressData >= 26 ? "Severe" :
                        stressData >= 19 ? "Moderate" :
                          stressData >= 15 ? "Mild" :
                            stressData >= 0 ? "Normal" :
                              ''}
                  </span>
                </li>
                <li>Anxiety: {anxietyData} :
                  <span style={{
                    fontSize: 22,
                    borderRadius: 10,
                    padding: 4,
                    color: 'black',
                    backgroundColor: anxietyData >= 20 ? "#F7A4A4" :
                      anxietyData >= 15 ? "#F57328" :
                        anxietyData >= 10 ? "#FFE9A0" :
                          anxietyData >= 8 ? "#EFF669" :
                            anxietyData >= 0 ? "#B6E2A1" :
                              "white"
                  }}>
                    {anxietyData >= 20 ? "Extreme Severe" :
                      anxietyData >= 15 ? "Severe" :
                        anxietyData >= 10 ? "Moderate" :
                          anxietyData >= 8 ? "Mild" :
                            anxietyData >= 0 ? "Normal" :
                              ''}
                  </span>
                </li>
                <li>Depression: {depressionData} :
                  <span style={{
                    fontSize: 22,
                    borderRadius: 10,
                    padding: 4,
                    color: 'black',
                    backgroundColor: depressionData >= 28 ? "#F7A4A4" :
                      depressionData >= 21 ? "#F57328" :
                        depressionData >= 14 ? "#FFE9A0" :
                          depressionData >= 10 ? "#EFF669" :
                            depressionData >= 0 ? "#B6E2A1" :
                              "white"
                  }}>
                    {depressionData >= 28 ? "Extreme Severe" :
                      depressionData >= 21 ? "Severe" :
                        depressionData >= 14 ? "Moderate" :
                          depressionData >= 10 ? "Mild" :
                            depressionData >= 0 ? "Normal" :
                              ''}
                  </span>
                </li>
              </ul>
              <div>
                <h4>Notes: </h4>
                   
        <ul style={{ listStyleType: 'none', padding: 0 }}>
  {notes.map((note, index) => (
    <li key={index} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', maxWidth: '100%', marginBottom: '8px', padding: '8px' }}>
      <span style={{ overflow: 'hidden', fontSize: '24px', wordWrap: 'break-word', flex: 1, paddingLeft: '20px', position: 'relative' }}>
        <span style={{ position: 'absolute', left: '0', top: '0', fontSize: '24px', lineHeight: '24px' }}>
          &#8226;
        </span>
        {note.notes}
      </span>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => handleDeleteNote(note.notes_id)}
      >
        <DeleteIcon />
      </IconButton>
    </li>
  ))}
</ul>

              </div>
            </div>
          </div>

            <div className="form-group" >
            <TextField
              className="txtWidth"
              id="outlined-multiline-static"
              label="Add Note"
              multiline={true} // Set to true to make it multi-line
              rows={4} // Specify the number of rows
              variant="outlined"
              value={note}
              onChange={handleNoteChange}
              style={{ width: '100%' }}
            />
          </div>


          <br/>
          <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between',alignItems:'center' }}>
          <button onClick={addNote}>Add Note</button>
          <button onClick={createPdf}>Print</button>
          </div>

        
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
