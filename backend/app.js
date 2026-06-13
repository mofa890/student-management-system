
//  api/app.js
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const signupUser = require('./routes/signupUser');
const poststudent=require('./routes/poststudent');
const loginUser=require('./routes/loginUser');
const googleAuth=require('./routes/googleAuth');
const getStudents=require('./routes/getStudents');
const updateStudent=require('./routes/updateStudent');
const deleteStudent=require('./routes/deleteStudent');
const feedback=require('./routes/feedback');
const helmet=require('helmet');
const forgotPassword=require('./routes/forgotPassword');
const resetPassword=require('./routes/resetPassword');
const TokValidate=require('./routes/TokValidate');
const fees=require('./routes/fees');
const fetchFeeStudent=require('./routes/fetchFeeStudent');
const notPaidAdmission=require('./routes/notPaidAdmission');
const notPaidFee=require('./routes/notPaidFee');
const addFeeRecord=require('./routes/addFeeRecord');
const check_unique_id=require('./routes/check-unique-id');
const check_unique_enrollment=require('./routes/check-unique-enrollment');
const filterStudents=require('./routes/filterStudents');
const addMail=require('./routes/addMail');



const app = express();
app.use(helmet());
app.use(cors());
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected with MongoDB");
    })
    .catch(err => {
        console.error("Connection failed", err);
    });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());



// Routes
app.use('/signupUser',signupUser);
app.use('/loginUser',loginUser);
app.use('/auth',googleAuth);
app.use('/getStudents',getStudents);
app.use('/poststudent',poststudent);
app.use('/deleteStudent', deleteStudent);
app.use('/updateStudent', updateStudent);
app.use('/feedback',feedback);
app.use('/forgotPassword', forgotPassword);
app.use('/resetPassword', resetPassword);
app.use('/validate-token',TokValidate);
app.use('/fees',fees);
app.use('/fetchFeeStudent',fetchFeeStudent);
app.use('/notPaidAdmission',notPaidAdmission);
app.use('/notPaidFee',notPaidFee);
app.use('/addFeeRecord',addFeeRecord);
app.use('/check-unique-id',check_unique_id);
app.use('/check-unique-enrollment',check_unique_enrollment);
app.use('/filterStudents',filterStudents);
app.use('/saveEmailCredentials',addMail);





// Default response for unknown routes
app.use((req, res, next) => {
    res.status(404).json({
        message: "Not Found"
    });
});

module.exports = app;
