-- Submissions
CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    quest_id INTEGER REFERENCES quests(id) ON DELETE CASCADE,
    content TEXT,
    has_files BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) CHECK (status IN ('draft', 'submitted', 'graded', 'late', 'resubmit')) DEFAULT 'draft',
    submitted_at TIMESTAMP,
    grade NUMERIC(5, 2),
    xp_earned INTEGER DEFAULT 0,
    gold_earned INTEGER DEFAULT 0,
    teacher_feedback TEXT,
    graded_by INTEGER REFERENCES teachers(id),
    graded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, quest_id)
);

CREATE TRIGGER update_submissions_updated_at
BEFORE UPDATE ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_submissions_student_id ON submissions(student_id);
CREATE INDEX idx_submissions_quest_id ON submissions(quest_id);
CREATE INDEX idx_submissions_status ON submissions(status);

CREATE TABLE IF NOT EXISTS submission_files (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER REFERENCES submissions(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_size INTEGER,
    file_type VARCHAR(50),
    version INTEGER DEFAULT 1,
    is_current BOOLEAN DEFAULT TRUE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS file_access_logs (
    id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES submission_files(id) ON DELETE CASCADE,
    accessed_by INTEGER REFERENCES users(id),
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45)
);
