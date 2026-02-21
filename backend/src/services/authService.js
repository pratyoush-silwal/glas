const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const queries = require('../models/queries/authQueries');

const register = async (userData) => {
  const { username, email, password, role, ...profileData } = userData;

  // Check existing user
  const existingUser = await db.query(queries.findUserByEmail, [email]);
  if (existingUser.rows.length > 0) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Transaction for user + profile
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    const userResult = await client.query(queries.createUser, [
      username,
      email,
      hashedPassword,
      role
    ]);
    const user = userResult.rows[0];

    if (role === 'student') {
      await client.query(queries.createStudentProfile, [
        user.id,
        profileData.characterName,
        profileData.classId,
        profileData.raceId,
        profileData.academicLevelId
      ]);
    } else if (role === 'teacher') {
      await client.query(queries.createTeacherProfile, [
        user.id,
        profileData.fullName,
        profileData.department
      ]);
    }

    await client.query('COMMIT');
    return user;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const login = async (email, password) => {
  const result = await db.query(queries.findUserByEmail, [email]);
  
  if (result.rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  await db.query(queries.updateLastLogin, [user.id]);

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { token, user: { id: user.id, username: user.username, role: user.role } };
};

module.exports = {
  register,
  login
};
