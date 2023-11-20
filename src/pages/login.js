import '../css/login.css';
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginFormHeading,setLoginFormHeading] =useState(false);
  const [headerbackgroundclass, setheaderbackgroundclass] = useState('default-class');
  const navigate = useNavigate();


  useEffect(() => {
    setLoginFormHeading("Inventory Management System")
}, []);




  const handleLogin = async (email, password) => {
  try {
    
    const response = await axios.post('http://localhost:8000/api/login', {
      email,
      password,
    });

    // Store user information in local storage
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    // Redirect the user to the dashboard or any other protected page
    navigate('/invetorysystem');
  } catch (error) {
    // Handle login error
    if (error.response && error.response.status === 401) {

      setErrorMessage('Access denied. Please try again.');
      setLoginFormHeading(errorMessage)
      setheaderbackgroundclass('warning')

    } else if (error.response && error.response.status === 402) {

      setErrorMessage('Invalid credentials. Please try again later.');
      setLoginFormHeading(errorMessage)
      setheaderbackgroundclass('warning')

    } else {

      setErrorMessage('An error occurred. Please try again later.');
      setLoginFormHeading(errorMessage)
      setheaderbackgroundclass('warning')
    }
  }
};


  return (
    <div className="login">
      <pre hidden style={{ backgroundColor: 'silver' }}>{JSON.stringify({email,password})}</pre>
      <div className="wrappinglogin">
        <div className="loginform">
          <h2 className={headerbackgroundclass}>{loginFormHeading}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
            method="POST"
          >
            <div className="formgroup">
              <label>Username</label>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    
            </div>
            <div className="formgroup">
              <label>Password</label>
              <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              
            </div>
            <div className="formgroup">
              <input type="submit" value="Login" />
             
            </div>
            <Link to='/resetpassword' style={{color:'gray'}}>reset password</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
