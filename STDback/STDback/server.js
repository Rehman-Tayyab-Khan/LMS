const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');
const courseRoutes = require('./routes/course.routes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/teacher', studentRoutes);
app.use('/student', courseRoutes);

const myconnection = async()=>{
  try
  {
    await mongoose.connect('mongodb://localhost:27017/mydatabase')
    console.log("connected")
  }catch (err)
  {
console.log('hahaha');

  }}
  myconnection();
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
