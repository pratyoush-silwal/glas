-- Student Skills (Enrollments)
CREATE TABLE IF NOT EXISTS student_skills (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    skill_level INTEGER DEFAULT 1,
    current_xp INTEGER DEFAULT 0,
    max_xp INTEGER DEFAULT 100,
    mastery_points INTEGER DEFAULT 0,
    enrollment_status VARCHAR(20) DEFAULT 'enrolled',
    grade NUMERIC(5, 2),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(student_id, course_id)
);

CREATE INDEX idx_student_skills_student_id ON student_skills(student_id);
CREATE INDEX idx_student_skills_course_id ON student_skills(course_id);

CREATE TABLE IF NOT EXISTS skill_progress_history (
    id SERIAL PRIMARY KEY,
    student_skill_id INTEGER REFERENCES student_skills(id) ON DELETE CASCADE,
    old_level INTEGER,
    new_level INTEGER,
    reached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
