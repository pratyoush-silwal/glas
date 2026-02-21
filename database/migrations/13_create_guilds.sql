-- Guilds
CREATE TABLE IF NOT EXISTS guilds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_url VARCHAR(255),
    guild_master_id INTEGER REFERENCES students(id) ON DELETE SET NULL,
    level INTEGER DEFAULT 1,
    total_xp INTEGER DEFAULT 0,
    members_count INTEGER DEFAULT 1,
    guild_type VARCHAR(50),
    focus_area VARCHAR(100),
    is_open BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_guilds_updated_at
BEFORE UPDATE ON guilds
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS guild_memberships (
    id SERIAL PRIMARY KEY,
    guild_id INTEGER REFERENCES guilds(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    role VARCHAR(20) CHECK (role IN ('member', 'officer', 'guild_master')),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contribution_xp INTEGER DEFAULT 0,
    UNIQUE(guild_id, student_id)
);
