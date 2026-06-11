// EmailCredentialForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Components/EmailCredentials.css';


const EmailCredentialForm = () => {
  const [email, setEmail] = useState('');
  const [appPassword, setAppPassword] = useState('');

// Assuming you have userId stored in session or localStorage
const userId = localStorage.getItem('userId');

// Frontend   EmailCredentialForm.js
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/saveEmailCredentials`, {
      email,
      appPassword,
      userId,  // Send userId to associate the credentials with the logged-in user
    });
    alert('Credentials saved successfully!');
  } catch (err) {
    console.error('Error saving credentials:', err);
  }
};


  return (
    <form className='add-email-from' onSubmit={handleSubmit}>
      <label>Email: </label>
      <input id='email-from-inpt' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      
      <label>App Password: </label>
      <input id='email-from-inpt'  type="password" value={appPassword} onChange={(e) => setAppPassword(e.target.value)} required />

      <button id='email-from-btn'  type="submit">Submit</button>

         {/* Direct link for app passwords and 2FA */}
      <p className='app-password-help'>
        Need help? <a href="https://support.google.com/accounts/answer/185201?hl=en" target="_blank" rel="noopener noreferrer">Click here to learn how to generate an 'App Password' and set up 'Two-Factor Authentication'.</a>
      </p>
    </form>
  );
};

export default EmailCredentialForm;
