
// AddRecord.js  
import React, { useState } from 'react';
import StudentForm from './StudentForm';

const AddRecord = ({ onLogout }) => {
    const [students, setStudents] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const addStudent = (student) => {
        setStudents([...students, student]);
        setSuccessMessage('Student added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    };

    return (
        <div className="students-record">
            <StudentForm onAddStudent={addStudent} successMessage={successMessage} />
        </div>
    );
};

export default AddRecord;

