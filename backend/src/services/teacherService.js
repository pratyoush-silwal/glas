const db = require('../config/database');
const teacherQueries = require('../models/queries/teacherQueries');
const courseQueries = require('../models/queries/courseQueries');
const questQueries = require('../models/queries/questQueries');

const getProfile = async (userId) => {
  const result = await db.query(teacherQueries.getTeacherProfile, [userId]);
  return result.rows[0];
};

const getMyCourses = async (teacherId) => {
  const result = await db.query(teacherQueries.getMyCourses, [teacherId]);
  return result.rows;
};

const createCourse = async (data, teacherId) => {
  const { code, name, description, credits, semester, year } = data;
  const result = await db.query(courseQueries.createCourse, [
    code, name, description, teacherId, credits, semester, year
  ]);
  return result.rows[0];
};

const createQuest = async (data, teacherId) => {
  const { courseId, title, description, xpReward, dueDate, isPublished } = data;
  const result = await db.query(questQueries.createQuest, [
    courseId, teacherId, title, description, xpReward, dueDate, isPublished
  ]);
  return result.rows[0];
};

const getPendingSubmissions = async (teacherId) => {
  const result = await db.query(teacherQueries.getPendingSubmissions, [teacherId]);
  return result.rows;
};

const gradeSubmission = async (submissionId, grade, feedback, teacherId, stats) => {
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    
    // Default XP/Gold from quest - fetch them or pass them? Let's assume passed.
    const { xp, gold, str, int, dex, con, wis, cha } = stats;

    const res = await client.query(teacherQueries.gradeSubmission, [
      submissionId, grade, feedback, teacherId, xp, gold
    ]);
    
    const studentId = res.rows[0].student_id;

    await client.query(teacherQueries.updateStudentStats, [
      studentId, str, int, dex, con, wis, cha, xp, gold
    ]);

    await client.query('COMMIT');
    return { success: true, message: 'Submission graded!' };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  getProfile,
  getMyCourses,
  createCourse,
  createQuest,
  getPendingSubmissions,
  gradeSubmission
};
