import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import "../../styles/Components/FeeRecord.css";
import "../../styles/Components/FetchAllFee.css";

const FetchAllFee = () => {
    const [feeRecords, setFeeRecords] = useState([]);
    const [feeTypeFilter, setFeeTypeFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Current page state
    const [totalPages, setTotalPages] = useState(1); // Total pages state
    const limit = 10; // Limit per page
    const [jumpToPage, setJumpToPage] = useState(''); // Jump-to-page input state

    // Function to fetch fee records
    const fetchFees = async (currentPage) => {
        setLoading(true);
        try {
            let response;
            const params = {
                page: currentPage,
                limit,
                feeType: feeTypeFilter || undefined, // Optionally pass feeType
                month: monthFilter || undefined, // Optionally pass month filter
                year: yearFilter || undefined,  // Optionally pass year filter
            };

            // Use `/notPaidFee/fees` API if month and year filters are set
            if (monthFilter && yearFilter) {
                response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/notPaidFee/fees`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    params,
                });
            } else {
                // Otherwise use the regular `/fees` API
                response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/fees`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    params,
                });
            }

            setFeeRecords(response.data.feeRecords);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError('Failed to fetch fee records');
            console.error('Error fetching fee records:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFees(page); // Fetch data whenever page changes
    }, [page, feeTypeFilter, monthFilter, yearFilter]);

    const handleFilterChange = (e) => setFeeTypeFilter(e.target.value);
    const handleMonthChange = (e) => setMonthFilter(e.target.value);
    const handleYearChange = (e) => setYearFilter(e.target.value);

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    // Handle jump to page
    const handleJumpToPage = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(jumpToPage);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber);
            setJumpToPage(''); // Clear input after jump
        } else {
            alert('Invalid page number');
        }
    };

    // Function to calculate item number
    const calculateNumber = (index) => (page - 1) * limit + index + 1;

    return (
        <div className="parent-fee-all-record">
            <h2>All Fee Records</h2>
            <h3>Filter By Fee Type</h3>

            {/* Fee Type Dropdown */}
            <select value={feeTypeFilter} onChange={handleFilterChange}>
                <option value="">All Fees</option>
                <option value="Admission Fee">Admission Fee</option>
                <option value="Monthly Fee">Monthly Fee</option>
                <option value="Test/Entrance Fee">Test/Entrance Fee</option>
            </select>

            {/* Show Date Filters when Fee Type is 'Monthly Fee' */}
            {feeTypeFilter === 'Monthly Fee' && (
                <div>
                    <h4>Filter by month and year</h4>
                    <label>Month:</label>
                    <select value={monthFilter} onChange={handleMonthChange}>
                        <option value="">Select Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>

                    <label>Year:</label>
                    <select value={yearFilter} onChange={handleYearChange}>
                        <option value="">Select Year</option>
                        {Array.from({ length: 17 }, (_, i) => 2024 + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            )}

            {error && <p className="error-message">{error}</p>}

            {loading ? (
                <div className="loader-spiner"></div>
            ) : feeRecords.length > 0 ? (
                <div>
                    <ul>
                        {feeRecords.map((record, index) => (
                            <li className='itms' key={record._id}>
                                <p><strong>#{calculateNumber(index)}:</strong></p>
                                <p>ID: {record.stdId}</p>  
                                <p id='Name'>Name: <span id='Name'>{record.student ? record.student.studentName : 'N/A'}</span></p> 
                                <p id="feeType">Fee Type: {record.feeType}</p>
                                <p>Amount: {record.amount}</p>
                                <p>Paid: {record.paid ? '✔️' : '❌'}</p>
                                <p>Payment Date: {record.paymentDate ? new Date(record.paymentDate).toLocaleDateString() : 'N/A'}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination controls */}
                    <div className="pagination-controlss">
                    <div className="pagination">
                        <button id="next-prev-btn"  onClick={handlePrevPage} disabled={page === 1}>
                            Previous
                        </button>
                        <span>Page {page} of {totalPages}</span>
                        <button id="next-prev-btn"  onClick={handleNextPage} disabled={page === totalPages}>
                            Next
                        </button>
                    </div>

                    {/* Jump to page functionality */}
                    <form onSubmit={handleJumpToPage} className="jump-page-form">
                        <label htmlFor="jump-to-page">Jump to Page:</label>
                        <input
                            type="number"
                             id="jumpPage-inpt"
                            value={jumpToPage}
                            onChange={(e) => setJumpToPage(e.target.value)}
                            min="1"
                            max={totalPages}
                        />
                        <button id="jmp-btn" type="submit">Jump</button>
                    </form>
                    </div>
                </div>
            ) : (
                <p>No fee records found.</p>
            )}
        </div>
    );
};

export default FetchAllFee;
