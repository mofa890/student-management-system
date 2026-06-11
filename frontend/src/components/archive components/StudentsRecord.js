/*  This is the main component of all functionalities, It is not rendered anywhere ,but still it is correct and can be used in future */
//  StudentRecord.js  
import React, { useState, useEffect } from 'react';
import StudentForm from './StudentForm';
import StudentItem from './StudentItem';
import axios from 'axios';

const StudentsRecord = ({ onLogout }) => {
    const [students, setStudents] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getStudents`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setStudents(response.data);
        } catch (err) {
            console.error('Failed to fetch students:', err);
        }
    };

    const addStudent = (student) => {
        setStudents([...students, student]);
        setIsAdding(false);
    };

    const deleteStudent = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/deleteStudent/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setStudents(students.filter(student => student._id !== id));
            }
        } catch (err) {
            console.error('Failed to delete student:', err);
        }
    };

    const editStudent = (id) => {
        const studentToEdit = students.find(student => student._id === id);
        setCurrentStudent(studentToEdit);
        setIsEditing(true);
        setIsAdding(false);
    };

    const updateStudent = (updatedStudent) => {
        setStudents(students.map(student =>
            student._id === updatedStudent._id ? updatedStudent : student
        ));
        setIsEditing(false);
        setCurrentStudent(null);
    };

    return (
        <div className="students-record">
            <h2>Student Records</h2>
            <button onClick={() => {
                setIsAdding(!isAdding);
                setIsEditing(false);
                setCurrentStudent(null);
            }}>
                {isAdding ? 'Cancel' : 'Add New Student'}
            </button>
            {isAdding && <StudentForm onAddStudent={addStudent} />}
            {isEditing && <StudentForm student={currentStudent} onAddStudent={updateStudent} />}
            <div className="student-list">
                {students.map(student => (
                    <StudentItem
                        key={student._id}
                        student={student}
                        onDelete={deleteStudent}
                        onEdit={editStudent}
                    />
                ))}
                <button className="logout-button" onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
};

export default StudentsRecord;
