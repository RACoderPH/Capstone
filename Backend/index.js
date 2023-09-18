const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());



// Connection to the database


const userRoute = require('./Routes/UserRoutes/User');
app.use(userRoute);
const question = require('./Routes/QuestionRoute/Question')
app.use(question);
const announce = require('./Routes/AnnounceRoute/announce');
app.use(announce);
const answer = require('./Routes/AnswerRoute/answer');
app.use(answer);
// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
