// src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Components/LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/loginUser`, {
        emailOrPhone: email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);// user _id
      
      navigate('/register/home'); // Redirect to protected route after successful login
    } catch (error) {
      console.error('Login failed:', error);
      setError(
        error.response?.status === 404 ? 'User not found' : 
        error.response?.status === 401 ? 'Incorrect email or password' : 
        'An error occurred. Please try again.'
      );
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="form-header">Login</h2>
      <input 
        className="form-input" 
        type="email" 
        value={email}  
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email address*" 
        required
      />
      <input 
        className="form-input"
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password*" 
        required 
      />
      <button className="form-button" type="submit">Login</button>
      <h4 className="form-divider">OR</h4>
      <button className="toggle-button" type="button" onClick={() => navigate('/signup')}>
        Signup
      </button>
      <p className="forgot-password" onClick={handleForgotPassword}>
        Forgot Password?
      </p>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default LoginPage;
