-- Quests (Assignments)
CREATE TABLE IF NOT EXISTS quests (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    objectives JSONB,
    quest_type VARCHAR(50) CHECK (quest_type IN ('main', 'side', 'daily', 'weekly', 'event', 'boss')),
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard', 'epic', 'legendary')),
    xp_reward INTEGER DEFAULT 50,
    gold_reward INTEGER DEFAULT 10,
    requires_file_upload BOOLEAN DEFAULT FALSE,
    allowed_file_types VARCHAR(255),
    max_file_size INTEGER DEFAULT 10485760, -- 10MB
    due_date TIMESTAMP,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_quests_updated_at
BEFORE UPDATE ON quests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_quests_course_id ON quests(course_id);
CREATE INDEX idx_quests_due_date ON quests(due_date);
