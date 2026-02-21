const queries = {
  getQuestsByCourse: `
    SELECT * FROM quests WHERE course_id = $1 ORDER BY due_date;
  `,
  createQuest: `
    INSERT INTO quests (course_id, teacher_id, title, description, xp_reward, due_date, is_published)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `
};

module.exports = queries;
