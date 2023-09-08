import React, { useState } from 'react';
import './assessment.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { IconButton } from '@mui/material';
import blank from '../../images/blank.png';
import ass1 from '../../images/assessment1.png';
import ass2 from '../../images/assessment2.png';
import uuid from 'react-uuid';



  const createForm = ()=>{
    const id_ = uuid();
    console.log(id_)
  
}
const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newChoice, setNewChoice] = useState('');

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== '') {
      setQuestions([
        ...questions,
        { type: 'multiple-choice', question: newQuestion, choices: [] },
      ]);
      setNewQuestion('');
    }
  };

  const handleAddChoice = () => {
    if (newChoice.trim() !== '') {
      const updatedQuestions = [...questions];
      const currentQuestionIndex = updatedQuestions.length - 1; // Get the index of the last added question
      updatedQuestions[currentQuestionIndex].choices.push(newChoice);
      setQuestions(updatedQuestions);
      setNewChoice('');
    }
  };

  const handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleDeleteChoice = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices.splice(choiceIndex, 1);
    setQuestions(updatedQuestions);
  };

  

  return (
    <div className="assessment">
      <Sidebar />
      <div className="assessmentContainer">
        <Navbar />     
        
     <div className="templateTop">
      <div className="templateLeft">
        <p className="topTitle">Create New Form</p>
      </div>
      <div className="templateRight">
        <div className="galleryButton">
          Template gallery 
          <UnfoldMoreIcon/>
        </div>
        <IconButton>
          <MoreVertIcon/>
        </IconButton>


      </div>
    </div>


    <div className="templateBody">
      <div className="card" onClick={createForm}>
        <img src={blank} alt="no image"  className="cardImg"/>
        <p className="cardTitle">Blank Form</p>
      </div>

      <div className="card">
        <img src={ass1} alt="no image" className="cardImg"/>
        <p className="cardTitle">Assessment June 2023</p>
      </div>

      <div className="card">
        <img src={ass2} alt="no image" className="cardImg"/>
        <p className="cardTitle">Assessment August 2023</p>
      </div>

      <div className="card">
        <img src={ass2} alt="no image" className="cardImg"/>
        <p className="cardTitle">Assessment August 2023</p>
      </div>

      <div className="card">
        <img src={ass2} alt="no image" className="cardImg"/>
        <p className="cardTitle">Assessment August 2023</p>
      </div>

      <div className="card">
        <img src={ass2} alt="no image" className="cardImg"/>
        <p className="cardTitle">Assessment August 2023</p>
      </div>

      <div className="card">
        <img src={ass2} alt="no image" className="cardImg"/>
        <p className="cardTitle">Assessment August 2023</p>
      </div>

      <div className="card">
        <img src={ass2} alt="no image" className="cardImg"/>
        <p className="cardTitle">Assessment August 2023</p>
      </div>
      
    </div>

      </div>
    </div>



  );
};

export default Assessment;
