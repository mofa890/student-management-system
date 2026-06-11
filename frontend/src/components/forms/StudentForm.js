
 // StudentForm.js
import React, { useState, useEffect ,useRef} from "react";
import axios from "axios";
import '../../styles/Components/StudentForm.css';

const StudentForm = ({ student, onAddStudent,successMessage }) => {
  const [isIdUnique, setIsIdUnique] = useState(true);
  const [isEnrollmentUnique, setIsEnrollmentUnique] = useState(true);
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
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [religion, setReligion] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Track success state

  const debounceRef = useRef(null);

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
      setEnrollmentNumber(student.enrollmentNumber || "");
      setGuardianName(student.guardianName || "");
      setGuardianPhone(student.guardianPhone || "");
      setBloodGroup(student.bloodGroup || "");
      setReligion(student.religion || "");
      setCategory(student.category || "");
    }
  }, [student]);

    // Debounced function to check uniqueness of ID
    const checkUniqueId = async (value) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/check-unique-id`, { params: { id: value } });
        setIsIdUnique(response.data.isUnique);
        // setError(response.data.isUnique ? "" : "ID is already taken");
      } catch (err) {
        console.error("Error checking ID uniqueness", err);
      }
    };
     // Reset uniqueness state and error message when user modifies the ID
  const handleIdChange = (e) => {
    setId(e.target.value);
    setIsIdUnique(true); // Reset the uniqueness state
    setError(""); // Clear the error message
  };

  // Reset uniqueness state and error message when user modifies the enrollment number
  const handleEnrollmentChange = (e) => {
    setEnrollmentNumber(e.target.value);
    setIsEnrollmentUnique(true); // Reset the uniqueness state
    setError(""); // Clear the error message
  };
  
    // Debounced function to check uniqueness of Enrollment Number
    const checkUniqueEnrollmentNumber = async (value) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/check-unique-enrollment`, { params: { enrollmentNumber: value } });
        setIsEnrollmentUnique(response.data.isUnique);
        // setError(response.data.isUnique ? "" : "Enrollment Number is already taken");
      } catch (err) {
        console.error("Error checking enrollment number uniqueness", err);
      }
    };
  
    // Debounce effect for both ID and Enrollment Number uniqueness check
    useEffect(() => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        if (id) checkUniqueId(id);
        if (enrollmentNumber) checkUniqueEnrollmentNumber(enrollmentNumber);
      }, 100); // Adjust the debounce time as necessary
    }, [id, enrollmentNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");

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
      enrollmentNumber,
      guardianName,
      guardianPhone,
      bloodGroup,
      religion,
      category,
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
        onAddStudent(response.data.student);
          setId("");
          setEnrollmentNumber("");
      }
    } catch (err) {
      console.error("Failed to submit student:", err);
      setError("Failed to submit student");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<form onSubmit={handleSubmit} className="add-form">
  <h2 className="form-headers">Add Record</h2>
  <div className="form-rows">
  <div className="form-groups">
      <label className="form-label " htmlFor="id">ID*</label>
      <input  className={`inpt ${!isIdUnique ? "input-error" : ""}`} id="id" type="text" value={id} onChange={handleIdChange} required/>
      {!isIdUnique && <p className="UniqIdErrorMsg">Already taken, try different</p>}
    </div>
    <div className="form-groups">
      <label className="form-label " htmlFor="enrollment-number">Enrollment Number*</label>
      <input   className={`inpt ${!isEnrollmentUnique ? "input-error" : ""}`} id="enrollment-number" type="text" value={enrollmentNumber} onChange={handleEnrollmentChange}  required />
      {!isEnrollmentUnique && <p className="UniqEnrolErrorMsg">Already taken,try different</p>}
    </div>

  </div>
  <div className="form-rows">
    <div className="form-groups">
      <label className="form-label " htmlFor="student-name">Name*</label>
      <input className="inpt" id="student-name" type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} required/>
    </div>

    <div className="form-groups">
      <label className="form-label " htmlFor="father-name">Father Name*</label>
      <input className="inpt" id="father-name" type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)}  required/>
    </div>
  </div>


  <div  className="form-rows">
    <div className="form-groups">
      <label className="form-label " htmlFor="mother-name">Mother Name*</label>
      <input className="inpt" id="mother-name" type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)}  required/>
    </div>

    <div className="form-groups">
      <label className="form-label " htmlFor="genders">Gender*</label>
      <select id="genders" value={gender} onChange={(e) => setGender(e.target.value)} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
  </div>

  
  <div className="form-rows">
    <div className="form-groups">
      <label className="form-label " htmlFor="phone">Phone*</label>
      <input className="inpt" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
    </div>

    <div className="form-groups">
      <label className="form-label " htmlFor="email">Email</label>
      <input className="inpt" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
  </div>


  <div className="form-rows">
    <div className="form-groups">
      <label className="form-label " htmlFor="address">Address*</label>
      <input className="inpt" id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required/>
    </div>

    <div className="form-groups">
      <label className="form-label " htmlFor="city">City*</label>
      <input className="inpt" id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)}required />
    </div>
  </div>


  <div className="form-rows">
  <div className="form-groups">
  <label className="form-label " htmlFor="state">State*</label>
  <select id="state" value={state} onChange={(e) => setState(e.target.value)} required>
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


    <div className="form-groups">
      <label className="form-label " htmlFor="pincode">Pincode*</label>
      <input className="inpt" id="pincode" type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} required/>
    </div>
  </div>
  
  <div className="form-rows">
    <div className="form-groups">
      <label className="form-label " htmlFor="previousSchool">Previous School</label>
      <input className="inpt" id="previousSchool" type="text" value={previousSchool} onChange={(e) => setPreviousSchool(e.target.value)}/>
    </div>
    <div className="form-groups">
      <label className="form-label " htmlFor="classAdmittedTo">Class Admitted To*</label>
      <select id="classAdmittedTo" value={classAdmittedTo} onChange={(e) => setClassAdmittedTo(e.target.value)} required>
      <option value="">Select Class</option>
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
      </select>
    </div>

 
  </div>


 
  <div className="form-rows">
   

    <div className="form-groups">
      <label className="form-label " htmlFor="guardian-name">Guardian Name</label>
      <input className="inpt" id="guardian-name" type="text" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} />
    </div>
    <div className="form-groups">
      <label className="form-label " htmlFor="guardian-phone">Guardian Phone</label>
      <input className="inpt" id="guardian-phone" type="tel" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} />
    </div>
  </div>


  <div className="form-rows">
  

    <div className="form-groups">
      <label className="form-label " htmlFor="blood-groups">Blood Group</label>
      <select id="blood-groups" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
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
    <div className="form-groups">
   <label className="form-label " htmlFor="admissionDate">Admission Date*</label>
   <input className="inpt" id="admissionDate" type="date" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required />
</div>

   
  </div>

  <div className="form-rows">
  <div className="form-groups">
   <label className="form-label " htmlFor="dob">Date of Birth*</label>
   <input className="inpt" id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
</div>

<div className="form-groups">
  <label className="form-label " htmlFor="nationality">Nationality*</label>
  <select id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} required>
    <option value="">Select Nationality</option>
    <option value="Indian">Indian</option>
    <option value="Foreign">Foreign</option>
  </select>
</div>


  

 </div>

 
  <div className="form-rows">
   
    <div className="form-groups">
    <label className="form-label " htmlFor="category">Category</label>
     <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} >
       <option value="">Select Category</option>
       <option value="General">General</option>
       <option value="OBC">OBC</option>
       <option value="SC">SC</option>
       <option value="ST">ST</option>
       <option value="Other">Other</option>
     </select>
    </div>
    <div className="form-groups">
  <label className="form-label " htmlFor="religion">Religion</label>
  <select id="religon" value={religion} onChange={(e) => setReligion(e.target.value)}>
    <option value="">Select Religion</option>
    <option value="Hinduism">Hinduism</option>
    <option value="Islam">Islam</option>
    <option value="Christianity">Christianity</option>
    <option value="Jain">Jain</option>
    <option value="Other">Other</option>
  </select>
</div>


  </div>
  

  {/* Submit buton */}
  <div className="form-rows-btn">
     {error && <p className="error">{error}</p>}
     {successMessage && <p className="success-message">{successMessage}</p>}
    <button id="add-btn" type="submit" disabled={isSubmitting}>
      {/* {student ? "Update Student" : "Submit"} */}
      {isSubmitting ? "Submitting..." : "Submit"} {/* Change button text */}
    </button>
   
  </div>
</form>
  );
};

export default StudentForm;

