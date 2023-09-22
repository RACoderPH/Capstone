import React, { useEffect, useState } from 'react';
import './user.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

const User = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('http://localhost:5000/api/getuser')
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  return (
    <div className="user">
      <Sidebar />
      <div className="userContainer">
     
        <br />
        <br />
        <br />
        <div className="listContainer">
          <table style={{ flex: 1 }}>
            <thead>
              <tr>
               
                <th>Full name</th>
                <th>User Name</th>
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
                  <td>{user.staus}</td>
                  <td>{user.position}</td>
                  <td className="btns">
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
