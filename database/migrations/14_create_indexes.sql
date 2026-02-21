-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_students_user_id_fk ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_class_id_fk ON students(class_id);
CREATE INDEX IF NOT EXISTS idx_teachers_user_id_fk ON teachers(user_id);
CREATE INDEX IF NOT EXISTS idx_courses_code_idx ON courses(code);
CREATE INDEX IF NOT EXISTS idx_courses_teacher_id_fk ON courses(teacher_id);
CREATE INDEX IF NOT EXISTS idx_student_skills_student_fk ON student_skills(student_id);
CREATE INDEX IF NOT EXISTS idx_student_skills_course_fk ON student_skills(course_id);
CREATE INDEX IF NOT EXISTS idx_quests_course_fk ON quests(course_id);
CREATE INDEX IF NOT EXISTS idx_quests_due_date_idx ON quests(due_date);
CREATE INDEX IF NOT EXISTS idx_submissions_student_fk ON submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_submissions_quest_fk ON submissions(quest_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status_idx ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_student_rituals_student_fk ON student_rituals(student_id);
CREATE INDEX IF NOT EXISTS idx_ritual_completions_date_idx ON ritual_completions(completion_date);
