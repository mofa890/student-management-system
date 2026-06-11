
// user-management/ResetPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/resetPassword/${token}`, { password });
      setMessage('Your password has been reset successfully. You will be logged out on all other devices.');
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="header-log-sign">Reset Password</h2>
      <input
        className="SignupLog-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password*"
        required
      />
      <input
        className="SignupLog-input"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm New Password*"
        required
      />
      <button className="SignupLog-btn" type="submit">Reset Password</button>

      {/* Display success or error message */}
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ResetPasswordPage;
