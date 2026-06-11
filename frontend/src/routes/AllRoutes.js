
//  components/routes/AllRoutes.js
import {useState} from 'react';
import { lazy, Suspense } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


// Lazy-loaded components for performance optimization
const AuthPage = lazy(() => import('../components/auth/AuthPage'));
const Navbar = lazy(() => import('../components/layout/Navbar'));
const ForgotPasswordPage = lazy(() => import('../components/user-management/ForgotPasswordPage'));
const LoginPage = lazy(() => import('../components/auth/LoginPage'));
const SignupPage = lazy(() => import('../components/auth/SignupPage'));
const Home=lazy(()=>import('../components/Home'));
const AddRecord = lazy(() => import('../components/forms/AddRecord'));
const FetchRecord = lazy(() => import('../components/forms/FetchRecord'));
const Feedback = lazy(() => import('../components/user-management/Feedback'));
const Contact = lazy(() => import('../components/common/Contact'));
const About = lazy(() => import('../components/common/About'));
const UnpaidAdmissionFee = lazy(() => import('../components/fee/UnpaidAdmissionFee'));
const SearchStudentFee = lazy(() => import('../components/fee/SearchStudentFee'));
const FetchAllFee = lazy(() => import('../components/fee/FetchAllFee'));
const FeeFormSubmit = lazy(() => import('../components/fee/FeeFormSubmit'));
const SuccesseMail=lazy(()=>import('../components/layout/SuccesseMail'));
const EmailCredentialForm=lazy(()=>import('../components/forms/EmailCredentialForm'));
const Loader = () => <div className="loader-spiner"></div>; 
const NotFound = () => <div>404 Page Not Found</div>;

// Utility function for token validation
const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 > Date.now(); // Check if token is expired
  } catch (error) {
    return false;
  }
};

// ProtectedRoute component for route protection based on token validity
const ProtectedRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/" replace />;
};

// ErrorBoundary component to catch lazy-loading errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

const AllRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };
  
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/signup" element={<SignupPage />} /> */}
            <Route path="/signup" element={<SignupPage onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected routes under "/register" */}
            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <Navbar />
                </ProtectedRoute>
              }
            >
              {/* Nested routes under "/register" */}
              <Route path="add-record" element={<AddRecord />} />
              <Route path="fetch-record" element={<FetchRecord />} />
              <Route path="fee-payment" element={<FeeFormSubmit />} />
              <Route path="all-fee-records" element={<FetchAllFee />} />
              <Route path="search-student-fee" element={<SearchStudentFee />} />
              <Route path="unpaid-admission-fee" element={<UnpaidAdmissionFee />} />
              <Route path="about" element={<About />} />
              <Route path="home" element={<Home/>}/>
              <Route path='' element={<Home/>}/>
              <Route path="feedback" element={<Feedback />} />
              <Route path="contact" element={<Contact />} />
              <Route path='EmailCredentialForm' element={<EmailCredentialForm/>}/>
              <Route path="*" element={<NotFound />} /> {/* 404 for nested routes */}
            </Route>

            {/* Fallback for unknown routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default AllRoutes;
