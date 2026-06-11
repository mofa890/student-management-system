import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddRecord from '../forms/AddRecord';
import FetchRecord from '../forms/FetchRecord';
import Feedback from '../user-management/Feedback';
import About from '../common/About';
import Contact from '../common/Contact';
import Home from '../Home';
import FeeFormSubmit from '../fee/FeeFormSubmit';
import FetchAllFee from '../fee/FetchAllFee';
import SearchStudentFee from '../fee/SearchStudentFee';
import UnpaidAdmissionFee from '../fee/UnpaidAdmissionFee';
import axios from 'axios';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [activeComponent, setActiveComponent] = useState(() => localStorage.getItem('activeComponent') || 'home');
  const [isFeeDropdownOpen, setIsFeeDropdownOpen] = useState(false); // State to control dropdown visibility

  useEffect(() => {
    localStorage.setItem('activeComponent', activeComponent);
  }, [activeComponent]);

  // Periodically check for session validity
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/validate-token`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then(response => {
        if (response.status !== 200) {
          alert('Session has expired. Please log in again.');
          handleLogout();
        }
      })
      .catch(() => handleLogout());
    }, 15000); // 15 seconds interval

    return () => clearInterval(intervalId);
  }, []);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    setIsFeeDropdownOpen(false); // Close the dropdown after selecting an option
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('activeComponent');
    console.log('Logged out');
    window.location.reload();
  };

  const toggleFeeDropdown = () => {
    setIsFeeDropdownOpen(!isFeeDropdownOpen);
  };

  return (
    <>
      <Nav >
        <Menu>
          <MenuItem>
            <button className="menu-button" onClick={() => handleComponentChange('home')}>Home</button>
          </MenuItem>
          <MenuItem>
            <button className="menu-button" onClick={() => handleComponentChange('add')}>Add Record</button>
          </MenuItem>
          <MenuItem>
            <button className="menu-button" onClick={() => handleComponentChange('fetch')}>Records</button>
          </MenuItem>
          <MenuItem>
            {/* Fee Records Dropdown */}
            <div className="fee-dropdown">
              <button className="menu-button" onClick={toggleFeeDropdown}>
                Fee Records
              </button>
              {isFeeDropdownOpen && (
                <div className="dropdown-content">
                  <DropdownItem onClick={() => handleComponentChange('feePayment')}>Fee Payement</DropdownItem>
                  <DropdownItem onClick={() => handleComponentChange('allFeeRecords')}>All Fee Records</DropdownItem>
                  <DropdownItem onClick={() => handleComponentChange('searchStudentFee')}>Search Student</DropdownItem>
                  <DropdownItem onClick={() => handleComponentChange('unpaidAdmissionFee')}>Unpaid Admission Fee</DropdownItem>
                </div>
              )}
            </div>
          </MenuItem>
          <MenuItem>
            <button className="menu-button" onClick={() => handleComponentChange('about')}>About</button>
          </MenuItem>
          <MenuItem>
            <button className="menu-button" onClick={() => handleComponentChange('feedback')}>Feedback</button>
          </MenuItem>
          <MenuItem>
            <button className="menu-button" onClick={() => handleComponentChange('contact')}>Contact</button>
          </MenuItem>
        </Menu>
        <LogoutButton className='.logout-button' onClick={handleLogout}>Logout</LogoutButton>
      </Nav>

      {/* Conditionally Render Components based on activeComponent */}
      <div>
        {activeComponent === 'add' && <AddRecord />}
        {activeComponent === 'fetch' && <FetchRecord />}
        {activeComponent === 'feedback' && <Feedback />}
        {activeComponent === 'about' && <About />}
        {activeComponent === 'contact' && <Contact />}
        {activeComponent === 'home' && <Home />}
        
        {/* Fee Record related components */}
        {activeComponent === 'feePayment' && <FeeFormSubmit />}
        {activeComponent === 'allFeeRecords' && <FetchAllFee />}
        {activeComponent === 'searchStudentFee' && <SearchStudentFee />}
        {activeComponent === 'unpaidAdmissionFee' && <UnpaidAdmissionFee />}
      </div>
    </>
  );
};

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: white;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    padding: 0 20px; /* Adjust padding for spacing */

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 10px; /* Adjust padding for mobile */
    }
`;

const Menu = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%; /* Ensure full width for mobile menu */
    }
`;

const MenuItem = styled.li`
    position: relative;

    @media (max-width: 768px) {
        width: 100%; /* Ensure menu items take full width */
    }
`;

const DropdownItem = styled.div`
  padding: 10px;
  background-color: white;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: all 0.4s;
  }

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);

    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const LogoutButton = styled.button`
    background: none;
    border: none;
    border-radius: 10px;
    height:34px;
    background-color:rgb(157, 59, 59);
    color: white;
    cursor: pointer;
    font-size: .8rem;
    padding: 10px;
    margin-right:25px;


    @media (max-width: 768px) {
        margin: 10px 0; /* Adjust margin for mobile */
    }
`;

export default Navbar;