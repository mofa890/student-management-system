import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Components/FeeRecord.css'; 


const UnpaidMonthlyFee = () => {
    const [unpaidRecords, setUnpaidRecords] = useState([]);
    const [error, setError] = useState('');
    const [month, setMonth] = useState(new Date().getMonth() + 1);  
    const [year, setYear] = useState(new Date().getFullYear());     

    const fetchUnpaidMonthlyFees = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/notPaidFee`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                params: { month, year },  // Pass month and year as query parameters
            });
            setUnpaidRecords(response.data);
        } catch (err) {
            setError('Failed to fetch unpaid monthly fees');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUnpaidMonthlyFees();
    }, [month, year]);  // Fetch data when month or year changes

    const handleMonthChange = (e) => setMonth(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);

    return (
        <div className="unpaid-fees-container">
            <h2>Unpaid Monthly Fees</h2>

            {/* Month and Year Selection */}
            <div className="date-filters">
                <label>Month: 
                    <select value={month} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </label>
                <label>Year: 
                    <input
                        type="number"
                        value={year}
                        onChange={handleYearChange}
                        min="2000"
                        max={new Date().getFullYear()}
                    />
                </label>
            </div>

            {error && <p className="error-message">{error}</p>}

            {unpaidRecords.length > 0 ? (
                <ul className="unpaid-fees-list">
                    {unpaidRecords.map((record, index) => (
                        <li key={index}>
                            <p>Student Custom ID: {record.stdId}</p>
                            <p>Student Name: {record.studentName}</p>
                            <p>Amount Due: {record.amountDue}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No unpaid monthly fees found.</p>
            )}
        </div>
    );
};

export default UnpaidMonthlyFee;
