
// EditStudentForm.js

import React, { useState } from 'react';
import '../../styles/Components/StudentItem.css'; 
import UpdateForm from './UpdateForm';
import { format } from 'date-fns';

const StudentItem = ({ student,number, onDelete, onEdit, isEditing, currentStudent, onCancelEdit, onUpdateStudent }) => {
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const handleDeleteClick = (id) => {
        setStudentToDelete(id);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (studentToDelete) {
            await onDelete(studentToDelete);
        }
        setShowConfirm(false);
        setStudentToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setStudentToDelete(null);
    };

  const toggleView = () => {
    setIsViewVisible(!isViewVisible);
  };
  return (
    <div className="student-item">
      <h3>Name: <span id='spn'>{student.studentName}</span>  Class: <span  id='spn'>{student.classAdmittedTo}</span>   Id: <span  id='spn'>{student.id}</span> Admission Date: <span id='spn'> {student.admissionDate ? format(new Date(student.admissionDate), 'yyyy-MM-dd') : 'N/A'}</span></h3>
      <div className="student-actions">
        <button id='edit-del' onClick={toggleView}>{isViewVisible ? 'Hide' : 'View'}</button>
        <button id='edit-del' onClick={() => onEdit(student._id)}>Edit</button>
        <button id='edit-del' onClick={() => handleDeleteClick(student._id)}>Delete</button>
                {showConfirm && (
                    <div className="confirm-delete-dialog">
                        <p id='delete-confirm-msg'>Are you sure you want to delete this student?</p>
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                )}
  
        {/* Display the Cancel button when editing */}
        {isEditing && currentStudent._id === student._id && (
          <button id='cancel-btn' onClick={onCancelEdit}>Cancel Edit</button>
        )}
      </div>
  
      {isViewVisible && (
        <div className="student-details">
              <table>
            <tbody>
              <tr>
                <td><p id='item-p'>ID:</p></td>
                <td><p id='item-p'>{student.id}</p></td>
              </tr>
              
              <tr>
                <td><p id='item-p'>Father's Name:</p></td>
                <td><p id='item-p'>{student.fatherName}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Mother's Name:</p></td>
                <td><p id='item-p'>{student.motherName}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Date of Birth:</p></td>
                <td><p id='item-p'>{student.dob}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Gender:</p></td>
                <td><p id='item-p'>{student.gender}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Nationality:</p></td>
                <td><p id='item-p'>{student.nationality}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Date of Admission:</p></td>
                <td><p id='item-p'>{student.admissionDate}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Phone:</p></td>
                <td><p id='item-p'>{student.phone}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Email:</p></td>
                <td><p id='item-p'>{student.email}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Address:</p></td>
                <td><p id='item-p'>{student.address}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>City:</p></td>
                <td><p id='item-p'>{student.city}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>State:</p></td>
                <td><p id='item-p'>{student.state}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Pincode:</p></td>
                <td><p id='item-p'>{student.pincode}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Previous School:</p></td>
                <td><p id='item-p'>{student.previousSchool}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Class Admitted To:</p></td>
                <td><p id='item-p'>{student.classAdmittedTo}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Enrollment Number:</p></td>
                <td><p id='item-p'>{student.enrollmentNumber}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Guardian's Name:</p></td>
                <td><p id='item-p'>{student.guardianName}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Guardian's Phone:</p></td>
                <td><p id='item-p'>{student.guardianPhone}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Blood Group:</p></td>
                <td><p id='item-p'>{student.bloodGroup}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Religion:</p></td>
                <td><p id='item-p'>{student.religion}</p></td>
              </tr>
              <tr>
                <td><p id='item-p'>Category:</p></td>
                <td><p id='item-p'>{student.category}</p></td>
              </tr>
          
            </tbody>
          </table>
  
          <div id='update-form'>
            {/* Render the UpdateForm when editing */}
            {isEditing && currentStudent._id === student._id && (
              <UpdateForm student={currentStudent} onAddStudent={onUpdateStudent} />
            )}
          </div> 
        </div>
      )}
    </div>
  );
  
};

export default StudentItem;


