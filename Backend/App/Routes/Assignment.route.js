
"use strict"

const router = require("express").Router()
// const { verifyToken } = require('../../Middleware/authjwt')

const { addAssignment, GetAssignment, DeleteAssignment, GetAssignmentPdf ,updateassigment} = require('../Controllers/Assignments.controller')
const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory as Buffer
const upload = multer({ storage: storage });


// USER ADD EDIT
router.post('/upload', upload.single('pdf'), addAssignment);

router.post('/getall/assignment', GetAssignment);

router.post('/delete/assignment', DeleteAssignment)
router.post('/update/assignment', updateassigment)





module.exports = router;