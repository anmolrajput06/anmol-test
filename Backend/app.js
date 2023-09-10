"use strict";
require('dotenv').config();
const mongoConnection = require('./App/Connection/Connection')
const express = require("express");
const app = express();
const { Assignment } = require('../Backend/App/Model/Assignments.model');

const cors = require('cors');
const bodyparser = require('body-parser')

const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept", "authorization",
  ],
};
app.use(cors(corsOpts));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({limit: '10mb', extended: true}));
app.use(bodyparser.json());

const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory as Buffer
const upload = multer({ storage: storage });

// TEST API
app.get('/get', async (req, res) => {
  res.send({ msg: "Done!!!" })
})

// app.post('/upload', upload.single('pdf'), async (req, res) => {


//   const newAssignment = new Assignment({
//     title: req.body.title,
//     description: req.body.description,
//     pdf: req.file.buffer, // Store the file buffer in the 'pdf' field
//     user_id:req.body.user_id
//   });


//   try {
//     await newAssignment.save();
//     res.send({msg:'Assignment saved successfully',status:true});
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error saving assignment');
//   }
// });




app.use(require("./App/Routes/Student.route"));
app.use(require("./App/Routes/Assignment.route"));



// Server start
app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`)
);