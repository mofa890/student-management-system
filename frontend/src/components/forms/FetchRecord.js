import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Components/StudentForm.css";
import EditStudentForm from "./EditStudentForm";



const FetchRecord = ({ onLogout }) => {
  const [students, setStudents] = useState([]);
  const [classFilter, setClassFilter] = useState("");
  const [admissionYearFilter, setAdmissionYearFilter] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [filterType, setFilterType] = useState(""); // Track selected filter type
  const [totalStudents, setTotalStudents] = useState(0);
  const [page, setPage] = useState(1); // Track current page
  const [limit] = useState(10); // Limit for pagination
  const [totalPages, setTotalPages] = useState(0); // Track total number of pages
  const [jumpPage, setJumpPage] = useState(""); // Input for jump to page
  const [jumpError, setJumpError] = useState(""); // Error message for invalid jump
  const [loading, setLoading] = useState(false);

  // Build query parameters for fetching students

  const buildQueryParams = () => {
    const params = { page, limit };
    if (classFilter) params.classAdmittedTo = classFilter;
    if (admissionYearFilter) params.admissionYear = admissionYearFilter;
    if (searchId) params.searchId = searchId;
    if (searchName) params.searchName = searchName;
    return params;
  };

  useEffect(() => {
    fetchStudents(true); // Fetch new filtered data and reset the student list
  }, [page, classFilter, admissionYearFilter, searchId, searchName]);

  useEffect(() => {
    setPage(1); // Reset to page 1 when filters change
    fetchStudents(true); // Fetch new filtered data and reset the student list
  }, [filterType]);

  // Fetch students from the backend based on current filters and pagination
  const fetchStudents = async (reset = false) => {
    setLoading(true); // Start the loader
    try {
      const params = buildQueryParams();
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/filterStudents`,
        {
          params,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const fetchedStudents = response.data.students;

      if (reset) {
        setStudents(fetchedStudents); // Reset the student list when filters change
        setTotalStudents(response.data.total);
        setTotalPages(Math.ceil(response.data.total / limit)); // Calculate total number of pages
      } else {
        setStudents((prev) => [...prev, ...fetchedStudents]); // Append new students when loading more
      }

      setErrorMessage(""); // Clear any error message
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setStudents([]);
        setErrorMessage("No students found with the provided filters.");
      } else {
        console.error("Failed to fetch students:", err);
      }
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/deleteStudent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setStudents(students.filter((student) => student._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete student:", err);
    }
  };

  const editStudent = (id) => {
    const studentToEdit = students.find((student) => student._id === id);
    setCurrentStudent(studentToEdit);
    setIsEditing(true);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
    setIsEditing(false);
    setCurrentStudent(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentStudent(null);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setPage(1); // Reset to the first page when filter type changes

    // Reset the filters when changing the filter type
    if (e.target.value === "class") {
      setAdmissionYearFilter(""); // Clear admission year filter
      setSearchId(""); // Clear search by ID
      setSearchName(""); // Clear search by name
    } else if (e.target.value === "admissionYear") {
      setClassFilter(""); // Clear class filter
      setSearchId(""); // Clear search by ID
      setSearchName(""); // Clear search by name
    } else if (e.target.value === "searchId") {
      setClassFilter(""); // Clear class filter
      setAdmissionYearFilter(""); // Clear admission year filter
      setSearchName(""); // Clear search by name
    } else if (e.target.value === "searchName") {
      setClassFilter(""); // Clear class filter
      setAdmissionYearFilter(""); // Clear admission year filter
      setSearchId(""); // Clear search by ID
    } else {
      // If filter type is "None", reset all filters
      setClassFilter("");
      setAdmissionYearFilter("");
      setSearchId("");
      setSearchName("");
    }
  };

  // Navigate to previous page
  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Navigate to next page
  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleJumpPage = (pageToJump) => {
    const parsedPage = parseInt(pageToJump, 10);

    if (parsedPage >= 1 && parsedPage <= totalPages) {
      setPage(parsedPage); // Jump to the specified page
      setJumpPage(""); // Clear the input field after successful jump
      setJumpError(""); // Clear any error message
    } else {
      setJumpError(
        `Please enter a valid page number between 1 and ${totalPages}.`
      );
    }
  };

  return (
    <div className="students-record" id="students-record">
      <div className="parent-filter">
        <label className="filtertyplbl" htmlFor="filterType">
          Choose Filter or Search Type:
        </label>
        <select
          id="filterType"
          value={filterType}
          onChange={handleFilterTypeChange}
        >
          <option value="">None</option>
          <option value="class">Class</option>
          <option value="admissionYear">Admission Year</option>
          <option value="searchId">Search by ID</option>
          <option value="searchName">Search by Name</option>
        </select>
      </div>

      <div className="filter-section">
        {filterType === "class" && (
          <>
            <label className="filterop" htmlFor="classFilter">
              Filter by Class:
            </label>
            <select
              id="classFilter"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="">All Classes</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
              <option value="U.G">U.G</option>
              <option value="P.G">P.G</option>
              <option value="PhD">PhD</option>
              {/* Add class options here */}
            </select>
            {/* Sub-filter for admission year */}
            {classFilter && (
              <>
                <label className="filterop" htmlFor="classYearFilter">
                  Filter by Admission Year:
                </label>
                <select
                  id="classYearFilter"
                  value={admissionYearFilter}
                  onChange={(e) => setAdmissionYearFilter(e.target.value)}
                >
                  <option value="">All Admission Years</option>
                  <option value="2028">2028</option>
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  {/* Add more years here */}
                </select>
              </>
            )}
          </>
        )}

        {filterType === "admissionYear" && (
          <>
            <label className="filterop" htmlFor="admissionYearFilter">
              Filter by Admission Year:
            </label>
            <select
              id="admissionYearFilter"
              value={admissionYearFilter}
              onChange={(e) => setAdmissionYearFilter(e.target.value)}
            >
              <option value="">All Admission Years</option>
              <option value="2028">2028</option>
              <option value="2027">2027</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>

              {/* Add year options here */}
            </select>
          </>
        )}

        {filterType === "searchId" && (
          <>
            <label className="filterop" htmlFor="searchId">
              Search by Student ID:
            </label>
            <input
              type="text"
              id="searchId"
              value={searchId}
              placeholder="Enter student ID"
              onChange={(e) => setSearchId(e.target.value)}
            />
          </>
        )}

        {filterType === "searchName" && (
          <>
            <label className="filterop" htmlFor="searchName">
              Search by Name:
            </label>
            <input
              type="text"
              id="searchName"
              value={searchName}
              placeholder="Enter student name"
              onChange={(e) => setSearchName(e.target.value)}
            />
          </>
        )}
      </div>

      {loading ? (
        <div className="loader-spiner"></div> // Loader will show here when loading
      ) : (
        <>
          {errorMessage && <h3 className="error-message">{errorMessage}</h3>}

          {students.length > 0 ? (
            <div className="student-list">
              {students.map((student, index) => (
                <div key={student._id}>
                  <p>{(page - 1) * limit + index + 1}</p>
                  <EditStudentForm
                    student={student}
                    onDelete={deleteStudent}
                    onEdit={editStudent}
                    isEditing={isEditing}
                    currentStudent={currentStudent}
                    onCancelEdit={cancelEdit}
                    onUpdateStudent={updateStudent}
                  />
                </div>
              ))}
            </div>
          ) : (
            !errorMessage && <h2>No record found</h2>
          )}
        </>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="pagination-controlss">
          <button
            id="next-prev-btn"
            onClick={goToPreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            id="next-prev-btn"
            onClick={goToNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>

          {/* Jump to Page functionality--- Jump section */}
          <div className="jump-to-page">
            <label htmlFor="jumpPage">Jump to page:</label>
            <input
              type="number"
              id="jumpPage-inpt"
              value={jumpPage}
              onChange={(e) => {
                setJumpPage(e.target.value);
                // Clear the error message if input is valid
                if (e.target.value > 0 && e.target.value <= totalPages) {
                  setJumpError("");
                } else {
                  setJumpError("Invalid page number");
                }
              }}
              min="1"
              max={totalPages}
              placeholder={`Enter a page (1-${totalPages})`}
            />
            <button
              onClick={() => handleJumpPage(jumpPage)}
              disabled={jumpPage < 1 || jumpPage > totalPages || jumpError}
              id="jmp-btn"
            >
              Jump
            </button>
            {jumpError && <p className="jmp-error-message">{jumpError}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchRecord;
