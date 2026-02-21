-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    full_name VARCHAR(100),
    title VARCHAR(50),
    department VARCHAR(100),
    specialization VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(255),
    office_location VARCHAR(100),
    office_hours VARCHAR(255),
    email_public VARCHAR(100),
    phone VARCHAR(20),
    teacher_level INTEGER DEFAULT 1,
    mentor_points INTEGER DEFAULT 0,
    hire_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_teachers_updated_at
BEFORE UPDATE ON teachers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
