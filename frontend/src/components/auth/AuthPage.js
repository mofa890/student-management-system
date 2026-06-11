// src/components/AuthPage.js 
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ForgotPasswordPage from '../user-management/ForgotPasswordPage';
import '../../styles/AuthPage.css';
import { Helmet } from 'react-helmet';

const AuthPage = () => {
 return (
    <div className="auth-page">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Login, Signup, and Password management" />
      </Helmet>
      <div className="auth-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage onAuthSuccess={() => {}} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <div className="auth-background" />
    </div>
  );
};

export default AuthPage;
