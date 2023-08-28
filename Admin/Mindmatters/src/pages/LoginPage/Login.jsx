import React, { useState,useEffect } from 'react';
import './login.scss';
import Axios from "axios";
import Home from '../HomePage/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { colors } from '@mui/material';
function Login() {

const warning = () => toast.warn('Password not the same', {
  });

const userexist = () => toast.warn('User Already Exist', {
    });

 const [fullnameReg,setfullnameReg] = useState("")
 const [usernameReg,setUsernameReg] = useState("")
 const [emailReg,setEmailReg] = useState("")
 const [passwordReg,setPasswordReg] = useState("")
 const [ConfirmpasswordReg,setConfirmPasswordReg] = useState("")

 const [username,setUsername] = useState("")
 const [password,setPassword] = useState("")
 const register = () => {

  if(passwordReg !== ConfirmpasswordReg){
      warning();
  }
  else{
    Axios.post('http://localhost:5000/register', {
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
};



const login = () =>{
 
  Axios.post('http://localhost:5000/login', 
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
};

//ANimation Slider in login
  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });

    // Cleanup event listeners when the component is unmounted
    return () => {
      signUpButton.removeEventListener('click', () => {
        container.classList.add('right-panel-active');
      });

      signInButton.removeEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    };
  }, []);

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
{/*Successfull Toast*/}
<ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <div className="body">
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <div className='form'>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Fullname" 
              onChange={(e) => {
                setfullnameReg(e.target.value)
                }}/>
                 <input type="text" placeholder="Username" 
              onChange={(e) => {
                setUsernameReg(e.target.value)
                }}/>
              <input type="email" placeholder="Email"   
              onChange={(e) =>  {
                setEmailReg(e.target.value)
              }}/>
              <input type="password" placeholder="Password"  
              onChange={(e) => {
              setPasswordReg(e.target.value)
              }}/>
           <input type="password" placeholder="Confirm Password"  
              onChange={(e) => {
              setConfirmPasswordReg(e.target.value)
              }}/>
             <button onClick={register}>Sign Up</button>

            </div>
          </div>


            
          <div className="form-container sign-in-container">
            <div className='form'>
              <h1>Sign in</h1>
              <input type="text" placeholder="Name" id='username'
              onChange={(e) => {
                setUsername(e.target.value)
                }}/>
              <input type="password" placeholder="Password"  id='password'
              onChange={(e) => {
              setPassword(e.target.value)
              }}/>
              <a href="#">Forgot your password?</a>

              <button onClick={login}>Sign In</button>

            </div>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Login;
