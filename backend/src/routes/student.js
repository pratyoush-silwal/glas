const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/profile', auth, studentController.getProfile);
router.get('/skills', auth, studentController.getSkills);
router.get('/quests', auth, studentController.getQuests);
router.get('/rituals', auth, studentController.getRituals);
router.post('/rituals/complete', auth, studentController.completeRitual);
router.get('/available-courses', auth, studentController.getAvailableCourses);
router.post('/enroll', auth, studentController.enrollCourse);
router.post('/submit-quest', auth, upload.array('files', 5), studentController.submitQuest);
router.get('/leaderboard', auth, studentController.getLeaderboard);

module.exports = router;
