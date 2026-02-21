const queries = {
  getAllCourses: `
    SELECT c.*, t.full_name as teacher_name
    FROM courses c
    JOIN teachers t ON c.teacher_id = t.id
    ORDER BY c.code;
  `,
  getCourseById: `
    SELECT * FROM courses WHERE id = $1;
  `,
  createCourse: `
    INSERT INTO courses (code, name, description, teacher_id, credits, semester, year)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `,
  updateCourse: `
    UPDATE courses SET name = $2, description = $3 WHERE id = $1 RETURNING *;
  `,
  deleteCourse: `
    DELETE FROM courses WHERE id = $1;
  `
};

module.exports = queries;
