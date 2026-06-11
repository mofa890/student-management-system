
//FeeFormSubmit.js
import React, { useState } from 'react';
import axios from 'axios';
// import '../../styles/Components/FeeRecord.css'; 
import '../../styles/Components/FeeFormSubmit.css'; 


const FeeFormSubmit = () => {
  const [studentId, setStudentId] = useState('');  // Custom ID
  const [feeType, setFeeType] = useState('');
  const [amount, setAmount] = useState('');
  const [paid, setPaid] = useState(false);
  const [paymentDate, setPaymentDate] = useState('');
  const [error, setError] = useState('');
  const [isIdValid, setIsIdValid] = useState(null); // Track if ID is valid
  const [successMessage, setSuccessMessage] = useState(''); // Track success message
  const [failureMessage, setFailureMessage] = useState(''); // Track failure message

  // Function to check if the student exists
  const checkStudentId = async (id) => {
    if (id === '') {
      setIsIdValid(null);
      setError(''); // Clear error message when input is cleared
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getStudents/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      
      if (response.status === 200) {
        setIsIdValid(true);
        setError('');  // Clear error when valid student is found
      }
    } catch (err) {
      setIsIdValid(false);
      setError('Student ID does not exist');  // Set error when ID is invalid
    }
  };

  // Handle student ID input change
  const handleStudentIdChange = (e) => {
    const id = e.target.value;
    setStudentId(id);
    checkStudentId(id); // Check student ID when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isIdValid) {
      // Only set error if no error is already shown
      if (!error) {
        setError('Please enter a valid student ID before submitting.');
      }
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/addFeeRecord`, {
        stdId: studentId,
        feeType,
        amount,
        paid,
        paymentDate
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // If fee record submission is successful, show success message
      setSuccessMessage('Fee record added successfully!');
      setFailureMessage(''); // Clear any previous failure message
      setError(''); // Clear any previous error message
    } catch (err) {
      setSuccessMessage(''); // Clear any previous success message
      setFailureMessage('Failed to submit fee record'); // Show failure message
      setError(err.response?.data?.message || 'Failed to submit fee record');
    }
  };

  return (
    <form className="fee-record-form" onSubmit={handleSubmit}>
      <h2>Fee Payement </h2>
      <label className='lb' htmlFor="studentId">Student ID:</label>
      <input
        type="text"
        id="studentId"
        value={studentId}
        onChange={handleStudentIdChange}
        required
      />
      {/* Show error message related to Student ID validation */}
      {isIdValid === false && <p className="error-message">Student ID does not exist</p>}

      <label className='lb' htmlFor="feeType">Fee Type:</label>
      <select
        id="feeType"
        value={feeType}
        onChange={(e) => setFeeType(e.target.value)}
        required
      >
        <option value="">Select</option>
        <option value="Admission Fee">Admission Fee</option>
        <option value="Monthly Fee">Teaching Fee</option>
        <option value="Test/Entrance Fee">Test/Entrance Fee</option>
      </select>

      <label className='lb' htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <label className='lb' htmlFor="paid">Paid:</label>
      <input
        type="checkbox"
        id="paid"
        checked={paid}
        onChange={() => setPaid(!paid)}
      />

      <label className='lb' htmlFor="paymentDate">Payment Date:</label>
      <input
        type="date"
        id="paymentDate"
        value={paymentDate}
        onChange={(e) => setPaymentDate(e.target.value)}
        required
      />

      <button type="submit" disabled={!isIdValid}>Submit Fee</button>

      {/* Show success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Show failure message */}
      {failureMessage && <p className="error-message">{failureMessage}</p>}
    </form>
  );
};

export default FeeFormSubmit;
