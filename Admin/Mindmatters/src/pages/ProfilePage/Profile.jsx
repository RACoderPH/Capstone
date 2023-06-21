import React, { useEffect, useState } from "react";
import './profile.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
const Profile = () => {
  const [localStorageValue, setLocalStorageValue] = useState('');

  useEffect(() => {
    const storedValue = localStorage.getItem('Username');
     // Retrieve the value from localStorage
    if (storedValue) {
      setLocalStorageValue(storedValue); // Update the component state with the retrieved value
    }
  }, []);
  return (
    <div className="profile">
        <Sidebar/>
            <div className="profileContainer">
                <Navbar/>
      <div className="container">
                
        <div className="col">lorem</div>
        <div className="col">lorem</div>
        <div className="col">lorem</div>
       

        </div>
        </div>
    </div>
  )
}

export default Profile