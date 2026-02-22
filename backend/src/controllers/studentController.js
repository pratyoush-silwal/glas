const studentService = require('../services/studentService');
const PDFDocument = require('pdfkit');

const getProfile = async (req, res) => {
  try {
    const profile = await studentService.getProfile(req.user.id);
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getReport = async (req, res) => {
  try {
    const profile = await studentService.getProfile(req.user.id);
    const skills = await studentService.getSkills(profile.id);
    const quests = await studentService.getQuests(profile.id);

    const doc = new PDFDocument();
    let filename = `Report_${profile.character_name}.pdf`;
    filename = encodeURIComponent(filename);

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.fontSize(25).text('Hero Progress Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`Character: ${profile.character_name}`);
    doc.fontSize(14).text(`Class: ${profile.class_name} | Level: ${profile.level}`);
    doc.text(`Total XP: ${profile.experience_points} | Gold: ${profile.gold}`);
    
    doc.moveDown();
    doc.fontSize(16).text('Stats:', { underline: true });
    doc.fontSize(12).text(`STR: ${profile.strength} | DEX: ${profile.dexterity} | INT: ${profile.intelligence}`);
    doc.text(`WIS: ${profile.wisdom} | CON: ${profile.constitution} | CHA: ${profile.charisma}`);

    doc.moveDown();
    doc.fontSize(16).text('Skill Mastery:', { underline: true });
    skills.forEach(skill => {
      doc.fontSize(12).text(`${skill.name}: Level ${skill.skill_level} (${skill.mastery_points} points)`);
    });

    doc.moveDown();
    doc.fontSize(16).text('Recent Quests:', { underline: true });
    quests.slice(0, 10).forEach(q => {
      doc.fontSize(12).text(`- ${q.title}: ${q.submission_status || 'In Progress'}`);
    });

    doc.end();
    doc.pipe(res);
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
  getReport,
  getSkills,
  getQuests,
  getRituals,
  completeRitual,
  enrollCourse,
  getAvailableCourses,
  submitQuest,
  getLeaderboard
};
