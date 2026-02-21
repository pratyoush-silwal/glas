const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const auth = require('../middleware/auth');
// const roleCheck = require('../middleware/roleCheck'); // TODO: Add role check

router.get('/profile', auth, teacherController.getProfile);
router.get('/courses', auth, teacherController.getCourses);
router.post('/courses', auth, teacherController.createCourse);
router.post('/quests', auth, teacherController.createQuest);
router.get('/submissions/pending', auth, teacherController.getPendingSubmissions);
router.post('/submissions/grade', auth, teacherController.gradeSubmission);

module.exports = router;
