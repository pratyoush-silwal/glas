-- Students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    character_name VARCHAR(50),
    class_id INTEGER REFERENCES rpg_classes(id),
    race_id INTEGER REFERENCES races(id),
    academic_level_id INTEGER REFERENCES academic_levels(id),
    level INTEGER DEFAULT 1,
    experience_points INTEGER DEFAULT 0,
    current_hp INTEGER DEFAULT 10,
    max_hp INTEGER DEFAULT 10,
    current_mana INTEGER DEFAULT 10,
    max_mana INTEGER DEFAULT 10,
    current_stamina INTEGER DEFAULT 10,
    max_stamina INTEGER DEFAULT 10,
    strength INTEGER DEFAULT 10,
    intelligence INTEGER DEFAULT 10,
    dexterity INTEGER DEFAULT 10,
    constitution INTEGER DEFAULT 10,
    wisdom INTEGER DEFAULT 10,
    charisma INTEGER DEFAULT 10,
    gold_coins INTEGER DEFAULT 0,
    avatar_url VARCHAR(255),
    title VARCHAR(100),
    gpa NUMERIC(3, 2) DEFAULT 0.00,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    expected_graduation DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_class_id ON students(class_id);
