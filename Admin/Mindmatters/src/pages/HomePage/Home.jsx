import React, { useEffect, useState } from "react";
import './home.scss';
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Widget from "../../components/Widget/Widget";
import Chart from "../../components/Chart/Chart";
import User from "../UserPage/User";
import axios from "axios";

function Home() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('http://localhost:5000/api/getuser')
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
              <button>View</button>
            </td>
          </tr>
  ))}
      </tbody>
    </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
