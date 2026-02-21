const teacherService = require('../services/teacherService');

const getProfile = async (req, res) => {
  try {
    const profile = await teacherService.getProfile(req.user.id);
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const profile = await teacherService.getProfile(req.user.id);
    const courses = await teacherService.getMyCourses(profile.id);
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const profile = await teacherService.getProfile(req.user.id);
    const course = await teacherService.createCourse(req.body, profile.id);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createQuest = async (req, res) => {
  try {
    const profile = await teacherService.getProfile(req.user.id);
    const quest = await teacherService.createQuest(req.body, profile.id);
    res.status(201).json({ success: true, data: quest });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getPendingSubmissions = async (req, res) => {
  try {
    const profile = await teacherService.getProfile(req.user.id);
    const submissions = await teacherService.getPendingSubmissions(profile.id);
    res.json({ success: true, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const gradeSubmission = async (req, res) => {
  try {
    const profile = await teacherService.getProfile(req.user.id);
    const { submissionId, grade, feedback, stats } = req.body;
    const result = await teacherService.gradeSubmission(submissionId, grade, feedback, profile.id, stats);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getProfile,
  getCourses,
  createCourse,
  createQuest,
  getPendingSubmissions,
  gradeSubmission
};
