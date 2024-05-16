import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { post } from '../services/authService';
import { Link, useNavigate } from "react-router-dom";
import scribeslogo from '../assets/images/scribeslogo.jpg';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
  
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
  
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const requestBody = { email, password };
   
      post('/auth/login', requestBody)
        .then((response) => {
          console.log('JWT token', response.data.authToken );
          storeToken(response.data.authToken);
          authenticateUser();
          navigate('/feed');                             // <== ADD      
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    };
    
    return (
      <div className='loginvw'>
        <div className="top-section">
          <img className="scribeslogo" src={scribeslogo} alt="Scribes Logo" />
          <p className="scribesp">Scribes</p>
        </div>
        <div className="Logindiv">

          <img className="loginlogo" src={scribeslogo} alt="Skillz Arena Logo" /> {/* Include the logo */}
          <h1 className="toplogin">Login</h1>
  
          <form onSubmit={handleLoginSubmit}>
            <label className="email">Email:</label>
            <input 
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
  
            <label className="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
  
            <button type="submit">Login</button>
          </form>
          { errorMessage && <p className="error-message">{errorMessage}</p> }
  
          <Link className="loginbold" to="/Feed"> log in..</Link>
        </div>
      </div>
    );
}

export default Login;
