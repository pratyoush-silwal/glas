-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    skill_type VARCHAR(50),
    base_xp_reward INTEGER DEFAULT 100,
    required_level INTEGER DEFAULT 1,
    credits INTEGER DEFAULT 3,
    department VARCHAR(100),
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
    max_students INTEGER DEFAULT 30,
    semester VARCHAR(20),
    year INTEGER,
    schedule VARCHAR(100),
    classroom VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_courses_teacher_id ON courses(teacher_id);
CREATE INDEX idx_courses_code ON courses(code);
