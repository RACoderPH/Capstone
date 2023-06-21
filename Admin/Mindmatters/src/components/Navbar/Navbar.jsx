import './navbar.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
//import { DarkModeContext } from "../../context/darkModeContext";
import React, { useEffect, useState } from "react";
function Navbar  () {
  const [localStorageValue, setLocalStorageValue] = useState('');

  useEffect(() => {
    const storedValue = localStorage.getItem('Username');
     // Retrieve the value from localStorage
    if (storedValue) {
      setLocalStorageValue(storedValue); // Update the component state with the retrieved value
    }
  }, []);


    //const { dispatch } = useContext(DarkModeContext);
    return (
      <div className="navbar">
        <div className="wrapper">
          <div className="search">
            <input type="text" placeholder="Search..." />
            <SearchOutlinedIcon />
          </div>
          <div className="items">
          
            <div className="item">
            <p className='username'>{localStorageValue}</p>
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
export default Navbar