
// // // StudentsItem.js       

// // import React, { useState } from 'react';
// // import '../styles/StudentItem.css'; 
// // import StudentForm from './StudentForm'; 

// // const StudentItem = ({ student, onDelete, onEdit, isEditing, currentStudent, onCancelEdit, onUpdateStudent }) => {
// //   const [isViewVisible, setIsViewVisible] = useState(false);

// //   const toggleView = () => {
// //     setIsViewVisible(!isViewVisible);
// //   };

// //   return (
// //     <div className="student-item">
// //       <h3 className='head-std-name'>{student.studentName}</h3>
// //       <div className="student-actions">
// //         <button id='edit-del' onClick={toggleView}>{isViewVisible ? 'Hide' : 'View'}</button>
// //         <button id='edit-del' onClick={() => onEdit(student._id)}>Edit</button>
// //         <button id='edit-del' onClick={() => onDelete(student._id)}>Delete</button>
// //       </div>
// //       {isViewVisible && (
// //         <div className="student-details">
// //           <p id='item-p' >Father's Name: {student.fatherName}</p>
// //           <p id='item-p' >Mother's Name: {student.motherName}</p>
// //           <p id='item-p' >Address: {student.address}</p>
// //           <p id='item-p' >Date of Birth: {student.dob}</p>
// //           <p id='item-p' >Phone: {student.phone}</p>
// //           <p id='item-p' >Date of Admission: {student.admissionDate}</p>
// //           <p id='item-p' >School/College: {student.enrollmentNumber}</p>

// //           {/* Render the StudentForm and Cancel button when editing */}
// //           {isEditing && currentStudent._id === student._id && (
// //             <>
// //               <StudentForm student={currentStudent} onAddStudent={onUpdateStudent} />
// //               <button id='cancel-btn' onClick={onCancelEdit}>Cancel</button>
// //             </>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default StudentItem;
// import React, { useState } from 'react';
// import '../styles/StudentItem.css'; 
// import StudentForm from './StudentForm'; 

// const StudentItem = ({ student, onDelete, onEdit, isEditing, currentStudent, onCancelEdit, onUpdateStudent }) => {
//   const [isViewVisible, setIsViewVisible] = useState(false);

//   const toggleView = () => {
//     setIsViewVisible(!isViewVisible);
//   };

//   return (
//     <div className="student-item">
//       <h3 className='head-std-name'>{student.studentName}</h3>
//       <div className="student-actions">
//         <button id='edit-del' onClick={toggleView}>{isViewVisible ? 'Hide' : 'View'}</button>
//         <button id='edit-del' onClick={() => onEdit(student._id)}>Edit</button>
//         <button id='edit-del' onClick={() => onDelete(student._id)}>Delete</button>
//       </div>
//       {isViewVisible && (
//         <div className="student-details">
//           <p id='item-p'>ID: {student.id}</p>
//           <p id='item-p'>Father's Name: {student.fatherName}</p>
//           <p id='item-p'>Mother's Name: {student.motherName}</p>
//           <p id='item-p'>Date of Birth: {student.dob}</p>
//           <p id='item-p'>Gender: {student.gender}</p>
//           <p id='item-p'>Nationality: {student.nationality}</p>
//           <p id='item-p'>Date of Admission: {student.admissionDate}</p>
//           <p id='item-p'>Phone: {student.phone}</p>
//           <p id='item-p'>Email: {student.email}</p>
//           <p id='item-p'>Address: {student.address}</p>
//           <p id='item-p'>City: {student.city}</p>
//           <p id='item-p'>State: {student.state}</p>
//           <p id='item-p'>Pincode: {student.pincode}</p>
//           <p id='item-p'>Previous School: {student.previousSchool}</p>
//           <p id='item-p'>Class Admitted To: {student.classAdmittedTo}</p>
//           <p id='item-p'>Enrollment Number: {student. enrollmentNumber}</p>
//           <p id='item-p'>Guardian's Name: {student.guardianName}</p>
//           <p id='item-p'>Guardian's Phone: {student.guardianPhone}</p>
//           <p id='item-p'>Blood Group: {student.bloodGroup}</p>
//           <p id='item-p'>Religion: {student.religion}</p>
//           <p id='item-p'>Category: {student.category}</p>
//           <p id='item-p'>Medical History: {student.medicalHistory}</p>

//           {/* Render the StudentForm and Cancel button when editing */}
//           {isEditing && currentStudent._id === student._id && (
//             <>
//               <StudentForm student={currentStudent} onAddStudent={onUpdateStudent} />
//               <button id='cancel-btn' onClick={onCancelEdit}>Cancel</button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentItem;



