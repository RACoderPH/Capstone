import React, { useState } from 'react';
import './assessment.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

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

        <div className="form">
          <h1>Assessment Form</h1>

          <div className="new-question">
            <input
              type="text"
              placeholder="New Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <button onClick={handleAddQuestion}>Add Question</button>
          </div>

          {questions.map((question, questionIndex) => (
            <div className="question" key={questionIndex}>
              <div className="question-header">
                <input
                  type="text"
                  placeholder="Question"
                  value={question.question}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[questionIndex].question = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                />
                <button onClick={() => handleDeleteQuestion(questionIndex)}>
                  Delete
                </button>
              </div>
              {question.type === 'multiple-choice' && (
                <div className="choices">
                  {question.choices.map((choice, choiceIndex) => (
                    <div className="choice" key={choiceIndex}>
                      <input
                        type="text"
                        placeholder="Choice"
                        value={choice}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[questionIndex].choices[
                            choiceIndex
                          ] = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                      <button
                        onClick={() =>
                          handleDeleteChoice(questionIndex, choiceIndex)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <div className="add-choice">
                    <input
                      type="text"
                      placeholder="Add Choice"
                      value={newChoice}
                      onChange={(e) => setNewChoice(e.target.value)}
                    />
                    <button onClick={handleAddChoice}>Add Choice</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
