import React, { useEffect, useState } from "react";
import './profile.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublishIcon from '@mui/icons-material/Publish';
const Profile = () => {
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [userData, setUserData] = useState({});
  const [file, setFIle] = useState('');

  useEffect(() => {
    const storedValue = localStorage.getItem('Username');
     // Retrieve the value from localStorage
    if (storedValue) {
      setLocalStorageValue(storedValue); // Update the component state with the retrieved value
    }
    

    const userId = localStorage.getItem('ID');
    fetch(`http://localhost:5000/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  const handlefile = (e) => {
    setFile(e.targer,files[0])
}
  return (
    <div className="profile">
        <Sidebar/>
            <div className="profileContainer">
                <Navbar/>

      <div className="container">        
      <h1 className="colTitle">Welcome Admin</h1>

      <div className="UserContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src="https://www.famousbirthdays.com/faces/haerin-image.jpg" alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{localStorageValue}</span>
              <span className="userShowUserTitle">Guidance Counselor</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
            <PermIdentityIcon className="userShowIcon"/>
            <span className="showUserInfoTitle">{userData.user_name}</span>
            </div>
            <div className="userShowInfo">
            <CalendarTodayIcon className="userShowIcon"/>
            <span className="showUserInfoTitle">{userData.created_at}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
            <PermContactCalendarIcon className="userShowIcon"/>
            <span className="showUserInfoTitle">+639-432-5235</span>
            </div>
            <div className="userShowInfo">
            <MailOutlineIcon className="userShowIcon"/>
            <span className="showUserInfoTitle">{userData.Email}</span>
            </div>
            <div className="userShowInfo">
            <LocationOnIcon className="userShowIcon"/>
            <span className="showUserInfoTitle">Pulilan, Bulacan</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form  className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label >Username</label>
                <input type="text" value={userData.user_name} className="userUpdateInput"></input>
              </div>
              <div className="userUpdateItem">
                <label >Full Name</label>
                <input type="text" value={userData.user_name} className="userUpdateInput"></input>
              </div>
              <div className="userUpdateItem">
                <label >Email</label>
                <input type="text" value={userData.Email} className="userUpdateInput"></input>
              </div>
              <div className="userUpdateItem">
                <label >Phone</label>
                <input type="text" placeholder="+639-432-5235" className="userUpdateInput"></input>
              </div>
              <div className="userUpdateItem">
                <label >Location</label>
                <input type="text" placeholder="Pulilan, Bulacan" className="userUpdateInput"></input>
              </div>
            </div>
            <div className="userUpadateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src="https://www.famousbirthdays.com/faces/haerin-image.jpg" alt="" />
                <label htmlFor="file"><PublishIcon></PublishIcon></label>
                <input type="file" id="file" style={{ display: "none"}} onChange={handlefile}></input>
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>

      </div>

      


    </div>
    </div>
  )
}

export default Profile