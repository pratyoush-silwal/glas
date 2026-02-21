// Auth related SQL queries
const queries = {
  findUserByEmail: `
    SELECT * FROM users WHERE email = $1;
  `,
  createUser: `
    INSERT INTO users (username, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, email, role;
  `,
  createStudentProfile: `
    INSERT INTO students (user_id, character_name, class_id, race_id, academic_level_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `,
  createTeacherProfile: `
    INSERT INTO teachers (user_id, full_name, department)
    VALUES ($1, $2, $3)
    RETURNING id;
  `,
  updateLastLogin: `
    UPDATE users SET last_login = NOW() WHERE id = $1;
  `
};

module.exports = queries;
