 // UpdateForm.js
 import React, { useState, useEffect } from "react";
 import axios from "axios";
 import "../../styles/Components/UpdateForm.css";
 
 const UpdateForm = ({ student, onAddStudent }) => {
   const [id,setId]=useState("");
   const [studentName, setStudentName] = useState("");
   const [fatherName, setFatherName] = useState("");
   const [motherName, setMotherName] = useState("");
   const [dob, setDob] = useState("");
   const [gender, setGender] = useState("");
   const [nationality, setNationality] = useState("");
   const [admissionDate, setAdmissionDate] = useState("");
   const [phone, setPhone] = useState("");
   const [email, setEmail] = useState("");
   const [address, setAddress] = useState("");
   const [city, setCity] = useState("");
   const [state, setState] = useState("");
   const [pincode, setPincode] = useState("");
   const [previousSchool, setPreviousSchool] = useState("");
   const [classAdmittedTo, setClassAdmittedTo] = useState("");
  //  const [enrollmentNumber, setEnrollmentNumber] = useState("");
   const [guardianName, setGuardianName] = useState("");
   const [guardianPhone, setGuardianPhone] = useState("");
   const [bloodGroup, setBloodGroup] = useState("");
   const [religion, setReligion] = useState("");
   const [category, setCategory] = useState("");
   const [medicalHistory, setMedicalHistory] = useState("");
   const [error, setError] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");
 
   useEffect(() => {
     if (student) {
       setId(student.id || "");
       setStudentName(student.studentName || "");
       setFatherName(student.fatherName || "");
       setMotherName(student.motherName || "");
       setDob(student.dob || "");
       setGender(student.gender || "");
       setNationality(student.nationality || "");
       setAdmissionDate(student.admissionDate || "");
       setPhone(student.phone || "");
       setEmail(student.email || "");
       setAddress(student.address || "");
       setCity(student.city || "");
       setState(student.state || "");
       setPincode(student.pincode || "");
       setPreviousSchool(student.previousSchool || "");
       setClassAdmittedTo(student.classAdmittedTo || "");
      //  setEnrollmentNumber(student.enrollmentNumber || "");
       setGuardianName(student.guardianName || "");
       setGuardianPhone(student.guardianPhone || "");
       setBloodGroup(student.bloodGroup || "");
       setReligion(student.religion || "");
       setCategory(student.category || "");
     }
   }, [student]);
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     if (isSubmitting) return;
     setIsSubmitting(true);
     setError("");
     setSuccessMessage("");
 
     const studentData = {
       id,
       studentName,
       fatherName,
       motherName,
       dob,
       gender,
       nationality,
       admissionDate,
       phone,
       email,
       address,
       city,
       state,
       pincode,
       previousSchool,
       classAdmittedTo,
      //  enrollmentNumber,
       guardianName,
       guardianPhone,
       bloodGroup,
       religion,
       category,
       medicalHistory
     };
 
     try {
       let response;
       if (student) {
         response = await axios.put(
           `${process.env.REACT_APP_API_BASE_URL}/updateStudent/${student._id}`,
           studentData,
           {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           }
         );
       } else {
         response = await axios.post(
           `${process.env.REACT_APP_API_BASE_URL}/poststudent`,
           studentData,
           {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           }
         );
       }
 
       if (response.status === 200 || response.status === 201) {
       
         setSuccessMessage("Updated Successfully!");
          // Wait 4 seconds before clearing the form
        setTimeout(() => {
        setSuccessMessage(""); // Optionally hide the success message
        handleClear(); // Clear form after 4 seconds
        onAddStudent(response.data.student);
      }, 4000);
       }
     } catch (err) {
       console.error("Failed to submit student:", err);
       setError("Failed to submit student");
     } finally {
       setIsSubmitting(false);
     }
   };
 
   const handleClear = () => {
     setId("");
     setStudentName("");
     setFatherName("");
     setMotherName("");
     setDob("");
     setGender("");
     setNationality("");
     setAdmissionDate("");
     setPhone("");
     setEmail("");
     setAddress("");
     setCity("");
     setState("");
     setPincode("");
     setPreviousSchool("");
     setClassAdmittedTo("");
    //  setEnrollmentNumber("");
     setGuardianName("");
     setGuardianPhone("");
     setBloodGroup("");
     setReligion("");
     setCategory("");
     setMedicalHistory("");
     setError("");
     setSuccessMessage("");
   };
 
   return (
    <form onSubmit={handleSubmit} className="update-form">
    {error && <p className="error">{error}</p>}
    <h2 className="form-header">Update</h2>
  
    <div className="form-row">
      
      <div className="form-group">
        <label htmlFor="student-name">Name</label>
        <input className="inpt" id="student-name" type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)}  />
      </div>
  
      <div className="form-group">
        <label htmlFor="father-name">Father Name</label>
        <input className="inpt" id="father-name" type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
      </div>
  
      <div className="form-group">
        <label htmlFor="mother-name">Mother Name</label>
        <input className="inpt" id="mother-name" type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)}  />
      </div>
    </div>
  
    <div className="form-row">
    <div className="form-group">
      <label htmlFor="guardian-phone">Guardian Phone</label>
      <input className="inpt" id="guardian-phone" type="tel" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} />
    </div>
        <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input className="inpt" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}  />
      </div>
  
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input className="inpt" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
     </div> 
  
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input className="inpt" id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)}  />
      </div>
  
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input className="inpt" id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)}  />
      </div>
      <div className="form-group">
       <label htmlFor="state">State</label>
       <select id="state" value={state} onChange={(e) => setState(e.target.value)}>
       <option value="">Select State</option>
      <option value="Andhra Pradesh">Andhra Pradesh</option>
       <option value="Arunachal Pradesh">Arunachal Pradesh</option>
      <option value="Assam">Assam</option>
      <option value="Bihar">Bihar</option>
      <option value="Chhattisgarh">Chhattisgarh</option>
      <option value="Goa">Goa</option>
      <option value="Gujarat">Gujarat</option>
      <option value="Haryana">Haryana</option>
      <option value="Himachal Pradesh">Himachal Pradesh</option>
      <option value="Jharkhand">Jharkhand</option>
      <option value="Karnataka">Karnataka</option>
      <option value="Kerala">Kerala</option>
      <option value="Madhya Pradesh">Madhya Pradesh</option>
      <option value="Maharashtra">Maharashtra</option>
      <option value="Manipur">Manipur</option>
      <option value="Meghalaya">Meghalaya</option>
      <option value="Mizoram">Mizoram</option>
      <option value="Nagaland">Nagaland</option>
      <option value="Odisha">Odisha</option>
      <option value="Punjab">Punjab</option>
      <option value="Rajasthan">Rajasthan</option>
      <option value="Sikkim">Sikkim</option>
      <option value="Tamil Nadu">Tamil Nadu</option>
      <option value="Telangana">Telangana</option>
      <option value="Tripura">Tripura</option>
      <option value="Uttar Pradesh">Uttar Pradesh</option>
      <option value="Uttarakhand">Uttarakhand</option>
      <option value="West Bengal">West Bengal</option>
    </select>
    </div>
    </div>
  
    <div className="form-row">
      
  
      <div className="form-group">
        <label htmlFor="pincode">Pincode</label>
        <input className="inpt" id="pincode" type="text" value={pincode} onChange={(e) => setPincode(e.target.value)}  />
      </div>
      {/* <div className="form-group">
        <label htmlFor="enrollment-number">Enrollment Number</label>
        <input className="inpt" id="enrollment-number" type="text" value={enrollmentNumber} onChange={(e) => setEnrollmentNumber(e.target.value)} />
      </div> */}
  
      <div className="form-group">
        <label htmlFor="guardian-name">Guardian Name</label>
        <input className="inpt" id="guardian-name" type="text" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} />
      </div>
    </div>
  
    <div className="form-row">
    <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        </div>
  
  <div className="form-group">
    <label htmlFor="blood-group">Blood Group</label>
    <select id="blood-group" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
      <option value="">Select Blood Group</option>
      <option value="A+">A+</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B-">B-</option>
      <option value="AB+">AB+</option>
      <option value="AB-">AB-</option>
      <option value="O+">O+</option>
      <option value="O-">O-</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="religion">Religion</label>
    <select id="religion" value={religion} onChange={(e) => setReligion(e.target.value)}>
      <option value="">Select Religion</option>
      <option value="Islam">Islam</option>
      <option value="Hinduism">Hinduism</option>
      <option value="Christianity">Christianity</option>
      <option value="Jain">Jain</option>
      <option value="Other">Other</option>
    </select>
  </div>
</div>

   
  
  
    {/* Conditionally render the buttons */}
    {!successMessage && (
      <div className="form-row">
        <button id="form-submit-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : student ? "Update Student" : "Add Student"}
        </button>

        <button id="form-clear-btn" type="button" onClick={handleClear}>
          Clear
        </button>
      </div>
    )}

    {/* Success message */}
    {successMessage && <p className="success-message">{successMessage}</p>}
  </form>
  
 
   );
 };
 
 export default UpdateForm;
 
 