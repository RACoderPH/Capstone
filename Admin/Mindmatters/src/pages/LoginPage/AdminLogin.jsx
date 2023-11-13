import React, { useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Chat from '../ChatPage/Chat';
import Axios from "axios";
import sdalogo from '../../images/doms.jpg';
import backgroundImg from '../../images/SDA.jpg';

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';

function login() {
    const [justifyActive, setJustifyActive] = useState('tab1');;

    const handleJustifyClick = (value) => {
      if (value === justifyActive) {
        return;
      }
  
      setJustifyActive(value);
    };

    const input = () => toast.warn('Please Fill-out the Field', {
    });
  const warning = () => toast.warn('Password not the same', {
    });
  
  const userexist = () => toast.warn('User Already Exist', {
      });
  
   const [fullnameReg,setfullnameReg] = useState("")
   const [usernameReg,setUsernameReg] = useState("")
   const [emailReg,setEmailReg] = useState("")
   const [passwordReg,setPasswordReg] = useState("")
   const [ConfirmpasswordReg,setConfirmPasswordReg] = useState("")
   const [user,setUser] = useState(null)
   const [username,setUsername] = useState("")
   const [password,setPassword] = useState("")

   const register = () => {
    if(fullnameReg === "" || usernameReg === "" || emailReg === "" || passwordReg ==="" || ConfirmpasswordReg === ""){
      input();
    }else{
      if(passwordReg !== ConfirmpasswordReg){
        warning();
    }else{
      Axios.post('https://mindmatters-ejmd.onrender.com/register', {
        fullname: fullnameReg,
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
      })
        .then((response) => {
          console.log(response);
          // Check the response for the status code indicating username already exists
          if (response.data.message === 'Username already exists') {
           userexist();
          }else if(response.data.message === 'User registered successfully'){
            window.location.href = '/';
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle other error scenarios if needed
        });
    }
    }
};
   
const login = () =>{
    if(username === "" || password === ""){
        input();
    }else{
      Axios.post('https://mindmatters-ejmd.onrender.com/login', 
    {
      username:username,
      password:password,
    }).then((response) => {
      console.log(response);
        if(response.data.message === 'Not Admin'){
          toast.warn('Not Admin', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }else{
             // Check if the login was successful
      if (response.data.message === 'User found') {
        const userId = response.data.id
        // Store the username in localStorage
        localStorage.setItem('ID', userId);
        localStorage.setItem('Username', username);
        
        // Redirect to the homepage or desired page
        window.location.href = '/home';
      }else{
        toast.warn('Check Username and Password', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        }
        }
    });
    }
    
  };
  return (
    <>
     {/*Warning Toast*/}
   <ToastContainer
  position="top-center"
  autoClose={1000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  className="warning" 
/>

<ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
<style>
        {`
          body {
            margin: 0;
            padding: 0;
          }
          .background-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url(${backgroundImg});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            opacity: 0.8; // Adjust the opacity as needed (0.0 to 1.0)
            z-index: -1;
          }
        `}
      </style>
    <div className="background-container"></div>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    <br/>
      <br/>
      <br/>
      <br/>
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink >
          <img
            src={sdalogo}
            alt="SDA Logo"
            className="mb-4"
            style={{ width: '300px', height: '300px', borderRadius: '50%' }}
          />
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <br/>
      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>


          <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='email' onChange={(e) => {
                setUsername(e.target.value)
                }}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'  onChange={(e) => {
              setPassword(e.target.value)
              }}/>

          

          <MDBBtn className="mb-4 w-100"  onClick={login}>Sign in</MDBBtn>
       

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100" onClick={register}>Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
    </>
  );
}

export default login;