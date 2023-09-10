

"use strict"

const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')

// Student Financial Information Collection
const StudentSchema = Schema({
    FullName: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: null
    },
    PhoneNo: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 10,
        unique: true,
        default: null
    },
    Password: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
 

},
    {
        timestamps: true
    },

)
const Student_model = model('Students', StudentSchema);



module.exports = {Student_model};
