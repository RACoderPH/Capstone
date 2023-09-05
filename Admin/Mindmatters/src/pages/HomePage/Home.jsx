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
        <Navbar />
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
          <th>Profile</th>
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
          <tr >
            <td><img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" /></td>
                  <td>{user.Fullname}</td>
                  <td>{user.user_name}</td>
                  <td>{user.Email}</td>
                  <td>{user.stud_no}</td>
                  <td>{user.status}</td>
                  <td>{user.position}</td>
            <td className="btn">
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
