const express = require('express');
const router = express.Router();
const controller = require('../controllers/student.controller');

router.post('/submit', controller.submitCourse);
router.get('/submission/:studentId', controller.getSubmissionByStudentId);
router.put('/update/:id', controller.updateSubmission);
router.delete('/delete/:id', controller.deleteSubmission);

module.exports = router; 