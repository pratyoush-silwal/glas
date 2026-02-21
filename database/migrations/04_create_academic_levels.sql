-- Academic Levels
CREATE TABLE IF NOT EXISTS academic_levels (
    id SERIAL PRIMARY KEY,
    year_number INTEGER NOT NULL,
    semester VARCHAR(20) CHECK (semester IN ('Fall', 'Spring', 'Summer')) NOT NULL,
    display_name VARCHAR(100),
    xp_required INTEGER NOT NULL
);

-- Insert default levels
INSERT INTO academic_levels (year_number, semester, display_name, xp_required) VALUES
(1, 'Fall', 'Freshman Fall', 0),
(1, 'Spring', 'Freshman Spring', 1000),
(2, 'Fall', 'Sophomore Fall', 2500),
(2, 'Spring', 'Sophomore Spring', 4500),
(3, 'Fall', 'Junior Fall', 7000),
(3, 'Spring', 'Junior Spring', 10000),
(4, 'Fall', 'Senior Fall', 13500),
(4, 'Spring', 'Senior Spring', 17500);
