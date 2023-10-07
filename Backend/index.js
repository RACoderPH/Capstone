const express = require("express");
const cors = require("cors");
const http = require("http"); // Import the 'http' module
const socketIo = require("socket.io"); // Import Socket.io

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
// Initialize Socket.io and attach it to the server
const io =  socketIo(server,{
  cors:{
    origin: "*",
    methods : ["GET","POST"],
  },
});
// Define Socket.io logic here...
io.on("connection", (socket) => {
console.log(`User Connected: ${socket.id}`);

socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
});

socket.on("send_message", (data) => {
  socket.to(data.room).emit("receive_message",data);
});

socket.on("disconnect", () =>{
  console.log("User Disconnected", socket.id);
});
});

// Connection to the database

app.use(express.static('public'));
const userRoute = require("./Routes/UserRoutes/User");
app.use(userRoute);
const question = require("./Routes/QuestionRoute/Question");
app.use(question);
const announce = require("./Routes/AnnounceRoute/announce");
app.use(announce);
const answer = require("./Routes/AnswerRoute/answer");
app.use(answer);
const diaries = require("./Routes/DiaryRoute/AddDiary")
app.use(diaries);
const forgot = require("./Routes/ForgotRoute/forgot")
app.use(forgot);
// Create an HTTP server




// Start the server
const port = process.env.PORT || 3000; // Use a default port if PORT is not defined
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
