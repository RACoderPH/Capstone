import React, { useState,useEffect } from 'react';
import './assessment.scss';
import Axios from "axios";
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const Assessment = () => {
  const [Question, setlist] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [Option1, setOption1] = useState(' ');
  const [Option2, setOption2] = useState(' ');
  const [Option3, setOption3] = useState(' ');
  const [Option4, setOption4] = useState(' ');
  const [question, setQuestion] = useState(' ');
  const [Category, setCategory] = useState(' ');

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('https://mindmatters-ejmd.onrender.com/Questions')
      .then((response) => response.json())
      .then((data) => setlist(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  const handleSubmit = () => {
    if (question == " " || Category == " " || Option1 == " " || Option2 == " " || Option3 == " " || Option4 == " ") {
      alert('Please fill in all input fields.');
    } else {
      Axios.post('https://mindmatters-ejmd.onrender.com/AddQuestion', {
        question: question,
        category: Category,
        option1: Option1,
        option2: Option2,
        option3: Option3,
        option4: Option4,
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
  
      handleClose(); // Close the modal after submitting
    }
  };

  return (
    <div className="assessment">
      <Sidebar />
      <div className="assessmentContainer">
      
        {/* Ending of nav */}
        <br />
        <br />
        <br />
        <br />
        <div className='TopContainer'>
          <h2>Mind Matters Assessment</h2>
          <center>
          <h3>DASS - 42</h3>
          </center>
          
          <button onClick={handleOpen}>Add</button>
        </div>
        <br />
        {Question.length === 0 ? (
  <div className="questionContainer">No questions available.</div>
) : (
  Question.map((question_list) => (
    <div className="questionContainer" key={question_list.id}>
      <h3>Question: {question_list.Question} </h3>
      <h4>Category: {question_list.category}</h4>
      

      <ol className='list'>
        <li>{question_list.option1}</li>
        <li>{question_list.option2}</li>
        <li>{question_list.option3}</li>
        <li>{question_list.option4}</li>
        
      </ol>
      
      
      <input type="submit" value="Edit" className='btn'/>
      
    </div>
  ))
)}
       
        <div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} >
              <input
                type="text"
                name=""
                id=""
                placeholder="Question"
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
              />
              <select
                id="category"
                name="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="Null">Select</option>
                <option value="Depression">Depression</option>
                <option value="Anxiety">Anxiety</option>
                <option value="Stress">Stress</option>
              </select>
                <input
                  type="text"
                  placeholder={`Option 1`}
                  onChange={(e) => setOption1(e.target.value)}
                />
                   <input
                  type="text"
                  placeholder={`Option 2`}
                  onChange={(e) => setOption2(e.target.value)}
                />
                   <input
                  type="text"
                  placeholder={`Option 3`}
                  onChange={(e) => setOption3(e.target.value)}
                />
                   <input
                  type="text"
                  placeholder={`Option 4`}
                  onChange={(e) => setOption4(e.target.value)}
                />
              <button onClick={handleSubmit} className='btn'>Submit</button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '20px',
};

export default Assessment;
