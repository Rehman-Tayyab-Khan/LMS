const Student = require('../models/studentschema');
const Course = require('../models/courseschema');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); // Add this import

const generatePassword = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

exports.addStudent = async (req, res) => {
  try {
    const { name, email, batch, course, enrolledBy } = req.body;

    const password = generatePassword();
    const salt = await bcrypt.genSalt(10); // Hashing
    const hashedPassword = await bcrypt.hash(password, salt); // Hashing

    const newStudent = new Student({
      name,
      email,
      batch,
      course,
      password: hashedPassword, // Save hashed password
      enrolledBy,
      role: 'student'
    });

    await newStudent.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,   
        pass: process.env.EMAIL_PASS    
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to the Student Portal',
      text: `Hello ${name},\n\nYou have been registered in the student portal.\n\nYour login credentials are:\nEmail: ${email}\nPassword: ${password}\n\nRegards,\nAdmin`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'Student added and email sent successfully' });

  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Error adding student' });
  }
};


exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: 'Error updating student' });
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student' });
  }
};

exports.getStudentsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.query;
    const students = await Student.find({ enrolledBy: teacherId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
};

// GET /api/students - paginated
exports.getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const skip = (page - 1) * size;

    const total = await Student.countDocuments();
    const students = await Student.find().skip(skip).limit(size);

    res.json({
      data: students,
      total,
      page,
      size
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
};


exports.submitCourse = async (req, res) => {
  try {
    const { name, batch, course, remarks, studentId } = req.body;
    
    const newSubmission = new Course({
      name,
      batch,
      course,
      remarks,
      studentId
    });

    const savedSubmission = await newSubmission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    console.error('Error submitting course:', error);
    res.status(500).json({ message: 'Error submitting course' });
  }
};

exports.getSubmissionByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    console.log('Looking for submission with studentId:', studentId);
    
    const submission = await Course.findOne({ studentId });
    console.log('Found submission:', submission);
    
    res.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ message: 'Error fetching submission' });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubmission = await Course.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedSubmission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json(updatedSubmission);
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ message: 'Error updating submission' });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ message: 'Error deleting submission' });
  }
};

