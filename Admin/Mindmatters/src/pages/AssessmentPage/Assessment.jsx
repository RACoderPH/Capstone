import React, { useState } from 'react';
import './assessment.scss';
import Axios from "axios";
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Assessment = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [option1, setOption1] = useState(' ');
  const [option2, setOption2] = useState(' ');
  const [option3, setOption3] = useState(' ');
  const [option4, setOption4] = useState(' ');
  const [question, setQuestion] = useState(' ');
  const [category, setCategory] = useState(' ');

  const handleSubmit = () => {
    Axios.post('http://localhost:5000/AddQuestion', {
      question: question,
      category: category,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
    })
    .then((response) => {
      console.log(response);
      if (response.data.message === 'Server Error') {
        console.log("Server Error")
      }else if(response.data.message === 'Inserted'){
        console.log("Inserted")
      }
    })
    .catch((error) => {
      console.error(error);
      // Handle other error scenarios if needed
    });

    handleClose(); // Close the modal after submitting
  };

  return (
    <div className="assessment">
      <Sidebar />
      <div className="assessmentContainer">
        <Navbar />
        {/* Ending of nav */}
        <br />
        <br />
        <br />
        <br />
        <div className='TopContainer'>
          <h2>Mind Matters Assessment</h2>
          <button onClick={handleOpen}>Add</button>
        </div>
        <br />
        <div className="questionContainer">
          <h3>Question: </h3>
          <h4>Category: </h4>
          <ol className='list'>
              <li></li>
          </ol>
        </div>
        <div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
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
              <button onClick={handleSubmit}>Submit</button>
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
};

export default Assessment;
