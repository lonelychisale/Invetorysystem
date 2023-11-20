import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ResetPasswordform() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Form Data:', { email, token, password });

    try {
      const response = await axios.post('http://localhost:8000/api/reset-password', {
  email,
  token,
  password,
})

    

      

      const { status, message } = response.data;

      if (status === 200) {
        console.log('Password reset successful');
        setSuccessMessage(message);
        setErrorMessage('');
      } else {
        console.log('Failed to reset password');
        setErrorMessage(message);
        setSuccessMessage('');
      }
    } catch (error) {
      
      console.error('An error occurred', error);
      setErrorMessage('Failed to reset password.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login">
      <div className="wrappinglogin">
        <div className="loginform">
          <h2>Reset Password</h2>
          <form onSubmit={handleLogin} method="POST">
            <div className="formgroup">
              <label>Enter email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>
            <div className="formgroup">
              <label>Enter token</label>
              <input
                type="text"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
               />

            </div>
            <div className="formgroup">
              <label>Enter new password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="formgroup">
              <input type="submit" value="Reset Password" />
            </div>
          </form>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <Link  to="/login" style={{ color: 'gray' }}>
            login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordform;
