-- Rituals
CREATE TABLE IF NOT EXISTS rituals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    ritual_type VARCHAR(20) CHECK (ritual_type IN ('daily', 'weekly', 'streak', 'habit')),
    category VARCHAR(20) CHECK (category IN ('study', 'fitness', 'meditation', 'reading', 'practice', 'social')),
    base_xp INTEGER DEFAULT 10,
    gold_reward INTEGER DEFAULT 1,
    duration_minutes INTEGER DEFAULT 15,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO rituals (name, description, ritual_type, category, base_xp, gold_reward, duration_minutes) VALUES
('Morning Meditation', 'Clear your mind before studying.', 'daily', 'meditation', 15, 2, 10),
('Study Session', 'Focused study block.', 'daily', 'study', 50, 5, 45),
('Read Chapter', 'Read a chapter from a textbook.', 'daily', 'reading', 30, 3, 30),
('Practice Problems', 'Solve 5 practice problems.', 'daily', 'practice', 40, 4, 30),
('Group Study', 'Study with peers.', 'weekly', 'social', 60, 10, 60),
('Review Notes', 'Review notes from previous lectures.', 'daily', 'study', 20, 2, 15),
('Exercise Break', 'Physical activity to refresh.', 'daily', 'fitness', 25, 2, 20),
('Weekly Review', 'Review all progress for the week.', 'weekly', 'study', 100, 15, 60),
('Help a Peer', 'Assist a classmate with a problem.', 'streak', 'social', 35, 5, 15);

CREATE TABLE IF NOT EXISTS student_rituals (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    ritual_id INTEGER REFERENCES rituals(id) ON DELETE CASCADE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_completed TIMESTAMP,
    completed_today BOOLEAN DEFAULT FALSE,
    times_completed_today INTEGER DEFAULT 0,
    total_completions INTEGER DEFAULT 0,
    total_xp_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, ritual_id)
);

CREATE TRIGGER update_student_rituals_updated_at
BEFORE UPDATE ON student_rituals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS ritual_completions (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    ritual_id INTEGER REFERENCES rituals(id) ON DELETE CASCADE,
    completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    xp_earned INTEGER,
    gold_earned INTEGER,
    streak_at_time INTEGER
);

CREATE INDEX idx_ritual_completions_date ON ritual_completions(completion_date);
