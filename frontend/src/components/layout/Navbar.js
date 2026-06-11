import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isFeeDropdownOpen, setIsFeeDropdownOpen] = useState(false);
  const [activeFeeItem, setActiveFeeItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const SideBarRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false); 
  const [isFeeSectionOpen, setIsFeeSectionOpen] = useState(false);
  const [isStudentSectionOpen, setIsStudentSectionOpen] = useState(false);


  // Memoized handleLogout using useCallback
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    console.log('Logged out');
    navigate('/');
  }, [navigate]); // Add navigate as a dependency

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/validate-token`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            alert('Session has expired. Please log in again.');
            handleLogout();
          }
        })
        .catch(() => handleLogout());
    }, 15000);

    return () => clearInterval(intervalId);
  }, [handleLogout]); // Include handleLogout in the dependency array

  useEffect(() => {
    const userId = localStorage.getItem('userId');
   
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFeeDropdownOpen(false);
      }
      if (SideBarRef.current && !SideBarRef.current.contains(event.target)) {
        setIsSideBarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Reset active fee item when navigating away from fee-related pages
    if (!location.pathname.includes('/register/fee')) {
      setActiveFeeItem(null);
    }
  }, [location]);

  const toggleSideBar = (e) => {
    e.preventDefault();
    setIsSideBarOpen(!isSideBarOpen);
   
  };

  const toggleFeeSection = () => {
    setIsFeeSectionOpen(!isFeeSectionOpen);
    setIsStudentSectionOpen(false); // Close Student section if open
  };

  const toggleStudentSection = () => {
    setIsStudentSectionOpen(!isStudentSectionOpen);
    setIsFeeSectionOpen(false); // Close Fee section if open
  };

  const isLinkActive = (path) => {
    return location.pathname.startsWith(path);
  };


  return (
    <>
     <nav className="navbar">
        <ul className="menu">   
          <li className="menu-item">
            <Link to="/register" className={`menu-link ${isSideBarOpen ? 'active' : ''}`} onClick={toggleSideBar} aria-expanded={isSideBarOpen} aria-haspopup="true">
              ☰
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/register/home" className={`menu-link ${isLinkActive('/register/home') ? 'active' : ''}`}>Home</Link>
          </li>
          <li className="menu-item">
            <Link to="/register/about" className={`menu-link ${isLinkActive('/register/about') ? 'active' : ''}`}>About</Link>
          </li>
          <li className="menu-item">
            <Link to="/register/feedback" className={`menu-link ${isLinkActive('/register/feedback') ? 'active' : ''}`}>Feedback</Link>
          </li>
          <li className="menu-item">
            <Link to="/register/contact" className={`menu-link ${isLinkActive('/register/contact') ? 'active' : ''}`}>Contact</Link>
          </li>
        </ul>
      </nav>
        {/* Home Bar */}
        
        <div className={`home-bar ${isSideBarOpen ? 'open' : ''}`}>
          
        <div>
          <div className={`home-bar-content ${isLinkActive('/register/add-record') || isLinkActive('/register/fetch-record') ? 'active' : ''}`} onClick={toggleStudentSection}>
            Student Section {isStudentSectionOpen ? '⏶' : '⏷'}
          </div>
          {isStudentSectionOpen && (
            <ul>
              <li className="home-bar-content">
                <Link to="/register/add-record" className={`home-bar-link ${isLinkActive('/register/add-record') ? 'active' : ''}`} onClick={() => { setIsSideBarOpen(false); }}>
                  Add Record
                </Link>
              </li>
              <li className="home-bar-content">
                <Link to="/register/fetch-record" className={`home-bar-link ${isLinkActive('/register/fetch-record') ? 'active' : ''}`} onClick={() => { setIsSideBarOpen(false); }}>
                  Existing Student Records
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className='fee-stdnt-section-parent'>
          <div className={`home-bar-content ${isLinkActive('/register/all-fee-records') || isLinkActive('/register/unpaid-admission-fee') || isLinkActive('/register/search-student-fee') || isLinkActive('/register/fee-payment') ? 'active' : ''}`} onClick={toggleFeeSection}>
            Fee Section {isFeeSectionOpen ? '⏶' : '⏷'}
          </div>
          {isFeeSectionOpen && (
            <ul>
              <li className="home-bar-content">
                <Link to="/register/all-fee-records" className={`home-bar-link ${isLinkActive('/register/all-fee-records') ? 'active' : ''}`} onClick={() => { setIsSideBarOpen(false); }}>
                  Existing Fee Records
                </Link>
              </li>
              <li className="home-bar-content">
                <Link to="/register/unpaid-admission-fee" className={`home-bar-link ${isLinkActive('/register/unpaid-admission-fee') ? 'active' : ''}`} onClick={() => { setIsSideBarOpen(false); }}>
                  Unpaid Admission Fee Records
                </Link>
              </li>
              <li className="home-bar-content">
                <Link to="/register/search-student-fee" className={`home-bar-link ${isLinkActive('/register/search-student-fee') ? 'active' : ''}`} onClick={() => { setIsSideBarOpen(false); }}>
                  Search Student Fee
                </Link>
              </li>
              <li className="home-bar-content">
                <Link to="/register/fee-payment" className={`home-bar-link ${isLinkActive('/register/fee-payment') ? 'active' : ''}`} onClick={() => { setIsSideBarOpen(false); }}>
                  Fee Payment
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="home-bar-content">
          <div className="home-bar-content">
            <Link to="/register/EmailCredentialForm" className={`home-bar-link ${isLinkActive('/register/EmailCredentialForm') ? 'active' : ''}`} onClick={() => { setIsSideBarOpen(false); }}>
              Add Email
            </Link>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className={`content-wrapper ${isSideBarOpen ? 'shifted' : ''}`}>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
