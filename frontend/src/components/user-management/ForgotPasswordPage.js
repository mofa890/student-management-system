
// //   user-management/ForgotPasswordPage.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPasswordPage = ({ onBackToLogin }) => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/forgotPassword`, { emailOrPhone: email });
//       setMessage('Password reset link has been sent to your email.');
//     } catch (error) {
//         if (error.response && error.response.status === 500) {
//             setError('Error occured..');
//           }
//       console.error('Error sending reset link:', error);
//       setError('Failed to send password reset link. Please try again.');
//     }
//   };

//   return (
//     <form className="auth-form" onSubmit={handleSubmit}>
//       <h2 className="header-log-sign">Forgot Password</h2>
//       <input
//         className="SignupLog-input"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email address*"
//         required
//       />
//       <button className="SignupLog-btn" type="submit">Send Reset Link</button>

//       {/* Display success or error message */}
//       {message && <p className="message">{message}</p>}
//       {error && <p className="error">{error}</p>}

//       <button className="toggle-btn" type="button" onClick={onBackToLogin}>
//         Back to Login
//       </button>
//     </form>
//   );
// };

// export default ForgotPasswordPage;


// src/user-management/ForgotPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Components/ForgotPassword.css'; 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/forgotPassword`, { emailOrPhone: email });
      setMessage('Password reset link has been sent to your email.');
    } catch (error) {
      console.error('Error sending reset link:', error);
      if (error.response && error.response.status === 500) {
        setError('Error occurred.');
      } else {
        setError('Failed to send password reset link. Please try again.');
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="header-log-sign">Forgot Password</h2>
      <input
        className="SignupLog-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address*"
        required
      />
      <button className="SignupLog-btn" type="submit">Send Reset Link</button>

      {/* Display success or error message */}
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}

      <button className="toggle-btn" type="button" onClick={() => navigate('/')}>
        Back to Login
      </button>
    </form>
  );
};

export default ForgotPasswordPage;

