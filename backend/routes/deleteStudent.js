
//   api/routes/deleteStudent.js
const express=require('express');
const router=express.Router();
const Student=require('../models/students');
const mongoose = require('mongoose');


router.delete('/:id',(req,res,next)=>
{
    Student.deleteOne({_id:req.params.id}).then((result)=>{
        res.status(200).json({
            message:"Student deleted."
        })
    }).catch((err)=>
    {
        res.status(500).json({
            error:err
        })
    })

})

module.exports=router;