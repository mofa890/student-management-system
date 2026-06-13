import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
  const [message, setMessage] = useState('Signing you in...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const error = searchParams.get('error');

    if (error) {
      setMessage('Google sign-in failed. Please try again.');
      return;
    }

    if (!token) {
      setMessage('Google sign-in did not return a token.');
      return;
    }

    localStorage.setItem('token', token);

    if (userId) {
      localStorage.setItem('userId', userId);
    }

    navigate('/register/home', { replace: true });
  }, [navigate, searchParams]);

  return <div className="loader-spiner">{message}</div>;
};

export default OAuthCallback;
