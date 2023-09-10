
"use strict"

const router = require("express").Router()
// const { verifyToken } = require('../../Middleware/authjwt')

const {signup ,login,getAllStudent} = require('../Controllers/Student.controller')



// USER ADD EDIT
router.post('/signup/student', signup);
router.post('/login/student', login);
router.get('/getall/student', getAllStudent);




module.exports = router;


