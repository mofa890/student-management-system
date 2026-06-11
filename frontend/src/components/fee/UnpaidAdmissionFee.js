import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../../styles/Components/FeeRecord.css";
import "../../styles/Components/UnpaidAdmissionFee.css";


const UnpaidAdmissionFee = () => {
  const [unpaidFees, setUnpaidFees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // State to track current page
  const [totalPages, setTotalPages] = useState(1); // State to track total pages
  const [jumpPage, setJumpPage] = useState(""); // State for user input for jump to page
  const limit = 10; // Limit of records per page
  const [jumpError, setJumpError] = useState("");

  const fetchUnpaidFees = async (currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/notPaidAdmission/admission`,
        {
          params: { page: currentPage, limit }, // Send page and limit as query params
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUnpaidFees(response.data.unpaidAdmissionFees);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Failed to fetch unpaid admission fees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnpaidFees(page);
  }, [page]); // Fetch data whenever page changes

  // Handle next page
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Function to calculate the number for each item
  const calculateNumber = (index) => (page - 1) * limit + index + 1;

  // Handle jump to page
  const handleJumpToPage = (e) => {
    e.preventDefault();
    const targetPage = parseInt(jumpPage, 10);
    if (targetPage > 0 && targetPage <= totalPages) {
      setPage(targetPage);
      setJumpPage(""); // Reset the input field
      setJumpError("");
    } else {
      setJumpError(
        `Please enter a valid page number between 1 and ${totalPages}.`
      );
    }
  };

  return (
    <div className="unpaid-fees-container">
      <h2>Unpaid Admission Fees</h2>

      {loading ? (
        <div className="loader-spiner"></div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : unpaidFees.length > 0 ? (
        <>
          <ul className="unpaid-fees-list">
            {unpaidFees.map((fee, index) => (
              <li key={index}>
                <p>
                  <strong>#{calculateNumber(index)}:</strong>
                </p>
                <p>
                  <strong>Student Custom ID:</strong> {fee.stdId}
                </p>
                <p>
                  <strong>Student Name:</strong> {fee.studentName}
                </p>
                <p>
                  <strong>Amount Due:</strong> {fee.amountDue}
                </p>
              </li>
            ))}
          </ul>

          {/* Pagination controls */}
          <div className="pagination-controlss">
          <div className="pagination">
            <button id="next-prev-btn" onClick={prevPage} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
               id="next-prev-btn"
                onClick={nextPage}
                disabled={page === totalPages && unpaidFees.length < limit}
            >
              Next
            </button>

          </div>

          {/* Jump to page functionality */}
          <form onSubmit={handleJumpToPage} className="jump-page-form">
            <label htmlFor="jumpPage">Jump to page:</label>
            <input
              type="number"
              id="jumpPage-inpt"
              value={jumpPage}
              onChange={(e) => {
                setJumpPage(e.target.value);
                if (e.target.value > 0 && e.target.value <= totalPages) {
                  setJumpError("");
                } else {
                  setJumpError("Invalid page number");
                }
              }}
              min="1"
              max={totalPages}
              // placeholder={`Enter a page (1-${totalPages})`}
            />
            <button  id="jmp-btn" type="submit">Jump</button>
            
          </form>
          </div>
        </>
      ) : (
        <p>All admission fees are paid or no fee records found.</p>
      )}
    </div>
  );
};

export default UnpaidAdmissionFee;
