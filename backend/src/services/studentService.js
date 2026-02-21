const db = require('../config/database');
const queries = require('../models/queries/studentQueries');

const getProfile = async (userId) => {
  const result = await db.query(queries.getProfile, [userId]);
  return result.rows[0];
};

const getSkills = async (studentId) => {
  const result = await db.query(queries.getSkills, [studentId]);
  return result.rows;
};

const getQuests = async (studentId) => {
  const result = await db.query(queries.getQuests, [studentId]);
  return result.rows;
};

const getRituals = async (studentId) => {
  const result = await db.query(queries.getRituals, [studentId]);
  return result.rows;
};

const completeRitual = async (studentId, ritualId) => {
  // Simple completion logic
  await db.query(queries.completeRitual, [studentId, ritualId]);
  // Add XP (simplified)
  await db.query(queries.updateXP, [studentId, 10]); 
  return { success: true, message: 'Ritual completed!' };
};

const enrollCourse = async (studentId, courseId) => {
  await db.query(queries.enrollCourse, [studentId, courseId]);
  return { success: true, message: 'Enrolled in course!' };
};

const submitQuest = async (studentId, questId, content, files = []) => {
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    
    const res = await client.query(queries.submitQuest, [studentId, questId, content]);
    const submissionId = res.rows[0].id;

    if (files && files.length > 0) {
      for (const file of files) {
        await client.query(queries.insertSubmissionFile, [
          submissionId,
          file.originalname,
          file.path.replace(/\\/g, '/'), // Ensure web-friendly paths
          file.size,
          file.mimetype
        ]);
      }
      
      // Update has_files flag
      await client.query('UPDATE submissions SET has_files = true WHERE id = $1', [submissionId]);
    }

    await client.query('COMMIT');
    return { success: true, message: 'Quest submitted with files!' };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getLeaderboard = async () => {
  const result = await db.query(queries.getLeaderboard);
  return result.rows;
};

const getAvailableCourses = async (studentId) => {
  const result = await db.query(queries.getAvailableCourses, [studentId]);
  return result.rows;
};

module.exports = {
  getProfile,
  getSkills,
  getQuests,
  getRituals,
  completeRitual,
  enrollCourse,
  submitQuest,
  getLeaderboard,
  getAvailableCourses
};
