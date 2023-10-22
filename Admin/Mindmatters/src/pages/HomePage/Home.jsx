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
  Label,
} from "recharts";

function Home() {
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to store the selected user's ID
  const [Stress, setStress] = useState(null);
  const [Anxiety, setAnxiety] = useState(null);
  const [Depression, setDepression] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

  };

  // Create state variables for Stress, Anxiety, and Depression
  const [stressData, setStressData] = useState(0);
  const [anxietyData, setAnxietyData] = useState(0);
  const [depressionData, setDepressionData] = useState(0);

   // Define the data variable here with initial values
   const [data, setData] = useState([
    { name: "Stress", value: Stress },
    { name: "Anxiety", value: Anxiety },
    { name: "Depression", value: Depression },
  ]);

  // Click handler for the "View" button
  const handleViewClick = (userId) => {
  setSelectedUserId(userId); // Set the selected user's ID
  handleOpen(); // Open the modal
};

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('https://mindmatters-ejmd.onrender.com/api/getuser')
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      axios
        .get(`https://mindmatters-ejmd.onrender.com/student_result/${selectedUserId}`)
        .then((response) => {
          const resultDataArray = response.data;
          console.log('Assessment Result Data (Raw):', resultDataArray);
  
          // Extract the values of stress, anxiety, and depression from the first object in the array
          if (resultDataArray.length > 0) {
            const { stress, anxiety, depression } = resultDataArray[0];
  
            // Create the data array for the PieChart directly
            const dataForPieChart = [
              { name: "Stress", value: stress },
              { name: "Anxiety", value: anxiety },
              { name: "Depression", value: depression },
            ];
  
            // Update the data state with the PieChart data
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
            <Button variant="outlined" onClick={() => handleViewClick(user.id)}>View</Button>
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
          <span className="userUpdateTitle">Mental Health Assesment Results</span>
          <span className="txt">The information can be edited</span>

          <div className="chart">
          <PieChart className="PieChart" width={400} height={320}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          >
          </Pie>
          <Tooltip />
          </PieChart>
          </div>

        <div className="result-placeholder">
        <h2>Results</h2>
        <ul>
          <li>Stress: {stressData}</li>
          <li>Anxiety: {anxietyData}</li>
          <li>Depression: {depressionData}</li>
        </ul>
        </div>
          
            <br/>
          </Box>
        </Modal>
    </div>
  );
}

export default Home;
