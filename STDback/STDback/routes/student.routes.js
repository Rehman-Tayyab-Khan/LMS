const express = require('express');
const router = express.Router();
const controller = require('../controllers/student.controller');

router.post('/add', controller.addStudent);
router.put('/update/:id', controller.updateStudent);
router.delete('/delete/:id', controller.deleteStudent);
router.get('/all', controller.getStudentsByTeacher);
router.get('/students', controller.getStudents);

module.exports = router;
