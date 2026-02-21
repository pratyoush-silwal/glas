const queries = {
  getProfile: `
    SELECT s.*, u.username, u.email, c.name as class_name, r.name as race_name, a.display_name as academic_level
    FROM students s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN rpg_classes c ON s.class_id = c.id
    LEFT JOIN races r ON s.race_id = r.id
    LEFT JOIN academic_levels a ON s.academic_level_id = a.id
    WHERE s.user_id = $1;
  `,
  getSkills: `
    SELECT ss.*, c.code, c.name, c.credits
    FROM student_skills ss
    JOIN courses c ON ss.course_id = c.id
    WHERE ss.student_id = $1;
  `,
  getQuests: `
    SELECT q.*, c.code as course_code, s.status as submission_status
    FROM quests q
    JOIN student_skills ss ON q.course_id = ss.course_id
    JOIN courses c ON q.course_id = c.id
    LEFT JOIN submissions s ON q.id = s.quest_id AND s.student_id = $1
    WHERE ss.student_id = $1 AND q.is_published = true
    ORDER BY q.due_date ASC;
  `,
  getRituals: `
    SELECT r.*, sr.current_streak, sr.completed_today
    FROM rituals r
    LEFT JOIN student_rituals sr ON r.id = sr.ritual_id AND sr.student_id = $1
    WHERE r.is_active = true;
  `,
  completeRitual: `
    INSERT INTO student_rituals (student_id, ritual_id, current_streak, completed_today, last_completed)
    VALUES ($1, $2, 1, true, NOW())
    ON CONFLICT (student_id, ritual_id)
    DO UPDATE SET
      current_streak = student_rituals.current_streak + 1,
      completed_today = true,
      last_completed = NOW(),
      total_completions = student_rituals.total_completions + 1;
  `,
  updateXP: `
    UPDATE students SET experience_points = experience_points + $2 WHERE id = $1 RETURNING experience_points;
  `,
  enrollCourse: `
    INSERT INTO student_skills (student_id, course_id)
    VALUES ($1, $2)
    ON CONFLICT (student_id, course_id) DO NOTHING;
  `,
  submitQuest: `
    INSERT INTO submissions (student_id, quest_id, content, status, submitted_at)
    VALUES ($1, $2, $3, 'submitted', NOW())
    ON CONFLICT (student_id, quest_id)
    DO UPDATE SET content = $3, status = 'submitted', submitted_at = NOW()
    RETURNING id;
  `,
  insertSubmissionFile: `
    INSERT INTO submission_files (submission_id, file_name, file_path, file_size, file_type)
    VALUES ($1, $2, $3, $4, $5);
  `,
  getLeaderboard: `
    SELECT s.character_name, s.level, s.experience_points, u.username, c.name as class_name
    FROM students s
    JOIN users u ON s.user_id = u.id
    JOIN rpg_classes c ON s.class_id = c.id
    ORDER BY s.experience_points DESC
    LIMIT 10;
  `,
  getAvailableCourses: `
    SELECT c.*, t.full_name as teacher_name
    FROM courses c
    LEFT JOIN teachers t ON c.teacher_id = t.id
    WHERE c.id NOT IN (SELECT course_id FROM student_skills WHERE student_id = $1);
  `
};

module.exports = queries;
