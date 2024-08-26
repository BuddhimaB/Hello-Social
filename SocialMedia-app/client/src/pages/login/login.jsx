import "./login.css";
import React, { useContext, useRef, useState } from 'react';
import {LoginCall} from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';



export default function Login() {
const email = useRef();
const password = useRef();
const {user,isFetching,error,dispatch} = useContext(AuthContext);


const handleClick = (e) => {
    e.preventDefault();
  LoginCall({ email:email.current.value , password:password.current.value }, dispatch);
};

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    console.log(user);
  return (
    <div className="login" >
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">HelloSocial</h3>
            <span className="loginDesc">
                Connect with friends and the world around you on HelloSocial.
            </span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input type="email" placeholder="Email" required pattern="[a-zA-Z0-9._%+-]+@gmail\.com" className="loginInput" ref={email}/>
                <div className="passwordWrapper">
                <input 
                type={passwordVisible ? 'text' : 'password'} 
                placeholder="Password" 
                className="loginInputPassword" 
                ref={password}
                required
                minLength={5}/>

                <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="toggle-btn"
            >
                {passwordVisible ? 'Hide' : 'Show'}
            </button>
                </div>
                
                <button className="loginButton">{isFetching? "Loading..":"Log In"}</button> // Add a loading spinner
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton">Create a New Account</button>
            </form>
        </div>
      </div>
    </div>
  )
}

