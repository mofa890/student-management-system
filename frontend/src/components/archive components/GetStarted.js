import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import AuthPage from '../auth/AuthPage';

const GetStarted = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLoginSignup = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <AuthPage onAuthSuccess={handleLoginSignup} />
      ) : (
        <Navbar onLogout={handleLogout} />
      )}
    </div>
  );
};

export default GetStarted;
