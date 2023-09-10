const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students"
  },
  pdf: Buffer, // Binary data for PDF
},{
  timestamps: true
},);

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = {Assignment};