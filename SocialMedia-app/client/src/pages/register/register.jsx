import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  //const navigate=useNavigate();


  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
       await axios.post("/auth/register", user);
       //navigate("/login");
        window.location.replace("/login");
      } catch (err) {
        console.log(err);
      }
    }
  }

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

              <input type="text"
               placeholder="User Name" 
               required 
               ref={username} 
               className="loginInput" />

                <input type="email" 
                placeholder="Email" 
                required ref={email}
                 pattern="[a-zA-Z0-9._%+-]+@gmail\.com" 
                 className="loginInput" />

                <input  placeholder="Password"
                 ref={password}
                  required 
                  type="password"
                  minLength={5}
                  className="loginInput" />

                <input  placeholder="Password-Again"
                 required 
                 ref={passwordAgain}
                 type="password" 
                 className="loginInput" />

                <button className="loginButton" type="submit">Sign up</button>
                
                <button className="loginRegisterButton">Log into Account</button>
            </form>
        </div>
      </div>
    </div>
  )
}
  

