// src/components/SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Components/SignupPage.css';

const SignupPage = ({ onAuthSuccess }) => {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/signupUser`, {
        name,
        emailOrPhone,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        onAuthSuccess();
        navigate('/register/home'); // Redirect to register page after successful signup
      }
    } catch (err) {
      setError('Signup failed: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleLoginRedirect = () => { 
    navigate('/'); // Redirect to login page
  };

  const handleGoogleSignup = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-header">Signup</h2>
        <input 
          id="signup-name" 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name*" 
          required 
        />
        <input  
          className="form-input" 
          type="email"  
          value={emailOrPhone}  
          onChange={(e) => setEmailOrPhone(e.target.value)}  
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
        <button className="form-button" type="submit">Signup</button>
        <h4 className="form-divider">OR</h4>
        <button className="google-auth-button" type="button" onClick={handleGoogleSignup}>
          Continue with Google
        </button>
        {error && <p className="error-message">{error}</p>}
        <button className="toggle-button" type="button" onClick={() => navigate('/')}> 
          Login
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
