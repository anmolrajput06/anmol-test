"use strict";
const bcrypt = require("bcrypt");
const { Student_model } = require('../Model/student.model');
const jwt = require('jsonwebtoken');



// Student CLASS
class Student {

    // USER ADD 
    async signup(req, res) {
        try {
            const { FullName, Email, PhoneNo, Password } = req.body;
            // IF USER ALEARDY EXIST              
            const existingemail = await Student_model.findOne({ Email: Email });

            if (existingemail) {
                return res.send({ status: false, msg: 'Email already exists', data: [] });
            }

            // const existingePhone = await Student_model.findOne({ PhoneNo: PhoneNo });
            // if (existingePhone) {
            //     return res.send({ status: false, msg: 'Phone Number already exists', data: [] });
            // }

            if (PhoneNo.length != 10) {
              return res.status(409).json({ status: false, msg: 'please Enter 10 digits phone number ', data: [] });
          }


            // PASSWORD LENGTH CHECK
            if (Password.length < 4) {
                return res.status(409).json({ status: false, msg: 'please Enter More Than 4 Digits ', data: [] });
            }

            const salt = await bcrypt.genSalt(10);
            var ByCryptrand_password = await bcrypt.hash(Password.toString(), salt);


            var Student_data = {
                FullName: FullName,
                Email: Email,
                PhoneNo: PhoneNo,
                Password: ByCryptrand_password,
            }

            const Students = new Student_model(Student_data)
           
            const StudentInfo = Students.save()
                .then(async (data) => {

                    res.send({ status: true, msg: "successfully Add!", data: data })

                })
                .catch((err) => {
                    console.log(" Add Time Error-", err);
                    if (err.keyValue) {
                        return res.send({ status: false, msg: 'Key duplicate', data: err.keyValue });

                    }

                })


        }
        catch (error) {
            res.send({ msg: "Error=>", error })
        }

    }


    async login(req, res) {
  
        try {
          const { Email, Password } = req.body;
      
          // Find user by email
      
          const Student = await Student_model.findOne({ Email });
          if (!Student) {
            return res.send({ message: "Student is not exist" })
          }
          const isPasswordValid = await bcrypt.compare(Password, Student.Password);
          if (!isPasswordValid || !Student) {
            return res.status(401).json({ message: 'Invalid email or password.' });
          }
      
      
          // Create and send JWT token
          const token = jwt.sign({ userId: Student._id, Email: Student.Email }, process.env.JWT_SECRET, {
            expiresIn: '10d',
          });
      
          res.status(200).json({ message: 'Login successful', token:token, data:Student });
      
        } catch (error) {
          console.error('Error during login:', error);
    
          res.status(500).json({ message: 'An error occurred during login.' });
        }
      };


      async getAllStudent(req, res) {
  
        try {
      
          const Student = await Student_model.find();
          if (!Student) {
            return res.send({ message: "Student is not exist" })
          }
       
      
          res.status(200).json({ message: 'Get all Successfull', data:Student });
      
        } catch (error) {
          console.log(error, '-------');
          res.status(500).json({ message: 'An error occurred during login.' });
        }
      };

}


module.exports = new Student()