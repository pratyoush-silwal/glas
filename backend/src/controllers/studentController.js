const studentService = require('../services/studentService');

const getProfile = async (req, res) => {
  try {
    const profile = await studentService.getProfile(req.user.id);
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getSkills = async (req, res) => {
  try {
    // We need studentId, get it from profile first or assume it's passed?
    // Better to get it from the user context if possible, but for now lets fetch profile to get student_id
    const profile = await studentService.getProfile(req.user.id);
    if (!profile) throw new Error('Student profile not found');
    
    const skills = await studentService.getSkills(profile.id);
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getQuests = async (req, res) => {
  try {
    const profile = await studentService.getProfile(req.user.id);
    const quests = await studentService.getQuests(profile.id);
    res.json({ success: true, data: quests });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getRituals = async (req, res) => {
  try {
    const profile = await studentService.getProfile(req.user.id);
    const rituals = await studentService.getRituals(profile.id);
    res.json({ success: true, data: rituals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const completeRitual = async (req, res) => {
  try {
    const profile = await studentService.getProfile(req.user.id);
    const { ritualId } = req.body;
    const result = await studentService.completeRitual(profile.id, ritualId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const profile = await studentService.getProfile(req.user.id);
    const { courseId } = req.body;
    const result = await studentService.enrollCourse(profile.id, courseId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAvailableCourses = async (req, res) => {
  try {
    const profile = await studentService.getProfile(req.user.id);
    const result = await studentService.getAvailableCourses(profile.id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const submitQuest = async (req, res) => {
  try {
    const profile = await studentService.getProfile(req.user.id);
    const { questId, content } = req.body;
    const files = req.files; // Array of files from multer
    const result = await studentService.submitQuest(profile.id, questId, content, files);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const result = await studentService.getLeaderboard();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getProfile,
  getSkills,
  getQuests,
  getRituals,
  completeRitual,
  enrollCourse,
  getAvailableCourses,
  submitQuest,
  getLeaderboard
};
