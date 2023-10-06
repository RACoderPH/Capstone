import React, { useEffect, useState } from "react";
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
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

function Home() {
  const [userList, setUserList] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const data = [
    { name: "Stress", users: 2000000000 },
    { name: "Anxiety", users: 1500000000 },
    { name: "Depression", users: 1000000000 },
  ];

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('https://mindmatters-ejmd.onrender.com/api/getuser')
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

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
              <button onClick={handleOpen}>View</button>
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
        >
          <Box className="box">
          <span className="userUpdateTitle">User Results</span>
          <span className="txt">The information can be edited</span>
          

          <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
          </PieChart>

            <br />
            <Button className="modalBtn" variant="outlined" >
              Save
            </Button>
          </Box>
        </Modal>
    </div>
  );
}

export default Home;
