const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  batch: String,
  course: String,
  password: String,
  role: String,
  remarks: String,
  studentId: String,
  enrolledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
});

module.exports = mongoose.model("Student", studentSchema);
