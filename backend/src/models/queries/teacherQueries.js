const queries = {
  getTeacherProfile: `
    SELECT t.*, u.email, u.username
    FROM teachers t
    JOIN users u ON t.user_id = u.id
    WHERE u.id = $1;
  `,
  getMyCourses: `
    SELECT * FROM courses WHERE teacher_id = $1;
  `,
  getPendingSubmissions: `
    SELECT sub.*, q.title as quest_title, s.character_name, u.username,
    (SELECT json_agg(sf.*) FROM submission_files sf WHERE sf.submission_id = sub.id) as files
    FROM submissions sub
    JOIN quests q ON sub.quest_id = q.id
    JOIN students s ON sub.student_id = s.id
    JOIN users u ON s.user_id = u.id
    WHERE q.teacher_id = $1 AND sub.status = 'submitted';
  `,
  gradeSubmission: `
    UPDATE submissions
    SET grade = $2, teacher_feedback = $3, status = 'graded', graded_by = $4, graded_at = NOW(), xp_earned = $5, gold_earned = $6
    WHERE id = $1
    RETURNING student_id, xp_earned, gold_earned;
  `,
  updateStudentStats: `
    UPDATE students
    SET strength = strength + $2,
        intelligence = intelligence + $3,
        dexterity = dexterity + $4,
        constitution = constitution + $5,
        wisdom = wisdom + $6,
        charisma = charisma + $7,
        experience_points = experience_points + $8,
        gold_coins = gold_coins + $9
    WHERE id = $1;
  `
};

module.exports = queries;
