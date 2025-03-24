import React, { useState } from 'react';
import './login.css';
import useSendData from "../../hooks/useSendData";
import URL_CONSTANTS from "../../constants/urlConstants";
import Axios from 'axios';

const LoginPage = () =>{
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');   
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Both fields are required');
    } else {
      // Handle login logic (e.g., send to backend or authenticate)
      const requestBody = {
        email: username,
        password: password
      };

      try {
        const res = await Axios.post(`${URL_CONSTANTS.POST_LOGIN}`,requestBody);
        //console.log(res);
        // Handle successful response
        console.log('Success:', res.data);
        setError('');
        alert('Logged in successfully!');
      } catch (error) {
        // Handle error
        if(error.response)
        setError(error.response.data.message);
        console.error('Error:', error.response ? error.response.data : error.message);
        
      }
      
      
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn-login">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;