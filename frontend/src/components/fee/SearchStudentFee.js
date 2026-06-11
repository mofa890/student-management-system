import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../../styles/Components/FeeRecord.css';
import "../../styles/Components/SearchStudentFee.css";


const SearchStudentFee = () => {
    const [stdId, setStdId] = useState('');
    const [feeType, setFeeType] = useState('');  // State to store selected fee type
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState('');

    // Function to fetch fee records from the server
    useEffect(() => {
        const fetchFeeRecords = async () => {
            if (stdId) {  // Make sure stdId is entered
                try {
                    const query = feeType ? `?feeType=${feeType}` : '';
                    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/fetchFeeStudent/${stdId}${query}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
    
                    if (response.status === 200) {
                        setSearchResult(response.data);
                        setError('');  // Clear error if fetch is successful
                    }
                } catch (err) {
                    if (err.response && err.response.status === 404) {
                        setError('No fee records found for the given ID');
                    } else {
                        setError('Failed to fetch fee record');
                    }
                    setSearchResult(null);  // Clear previous results on error
                    console.error(err);
                }
            }
        };
    
        if (stdId) {
            fetchFeeRecords();
        }
    }, [stdId, feeType]);  // Trigger search when stdId or feeType changes
    

    return (
        <div className="search-fee-container">
            {/* Input for entering student custom ID */}
            <h2>Search Student</h2>
            <label htmlFor="stdId">Enter Student ID:</label>
            <input
                type="text"
                id="stdId"
                value={stdId}
                onChange={(e) => setStdId(e.target.value)}
                required
            />
            {/* Dropdown for selecting fee type */}
            <label htmlFor="feeType">Select Fee Type Search Result:</label>
            <select
                id="feeType"
                value={feeType}
                onChange={(e) => setFeeType(e.target.value)}
            >
                <option value="">All Fees</option>
                <option value="Admission Fee">Admission Fee</option>
                <option value="Monthly Fee">Monthly Fee</option>
                <option value="Test/Entrance Fee">Test/Entrance Fee</option>
            </select>
            {/* Error message display */}
            {error && <p className="error-message">{error}</p>}
            {/* Display search results */}
            {searchResult && (
                <div className="search-results">
                    {searchResult.map((record) => (
                        <div key={record._id}>
                            <p>Student Custom ID: {record.stdId}</p>
                            <p>Fee Type: {record.feeType}</p>
                            <p>Amount: {record.amount}</p>
                            <p>Paid: {record.paid ? 'Yes' : 'No'}</p>
                            <p>Payment Date: {record.paymentDate ? new Date(record.paymentDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchStudentFee;
