const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    default: ''
  },
  studentId: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Course", courseSchema);
