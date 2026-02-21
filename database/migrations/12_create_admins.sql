-- Admins
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    full_name VARCHAR(100),
    role_level VARCHAR(20) CHECK (role_level IN ('super_admin', 'admin', 'moderator', 'support')),
    department VARCHAR(100),
    permissions JSONB,
    phone VARCHAR(20),
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    last_login_ip VARCHAR(45),
    last_action TIMESTAMP,
    actions_taken INTEGER DEFAULT 0,
    hire_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_admins_updated_at
BEFORE UPDATE ON admins
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS admin_action_logs (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL,
    action_type VARCHAR(50),
    target_type VARCHAR(50),
    target_id INTEGER,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS system_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20) CHECK (setting_type IN ('string', 'integer', 'boolean', 'json')),
    description TEXT,
    updated_by INTEGER REFERENCES admins(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO system_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'GLAS - Gamified Learning', 'string', 'The name of the platform'),
('max_file_upload_size', '10485760', 'integer', 'Max file size in bytes (10MB)'),
('allowed_file_types', 'pdf,doc,docx,txt,zip,jpg,png', 'string', 'Comma-separated list of allowed extensions'),
('default_xp_per_quest', '50', 'integer', 'Default XP reward'),
('maintenance_mode', 'false', 'boolean', 'Is the site in maintenance mode'),
('registration_open', 'true', 'boolean', 'Can new users register'),
('daily_reset_time', '00:00', 'string', 'Time when daily rituals reset'),
('max_streak_bonus', '2.0', 'string', 'Maximum multiplier for streaks')
ON CONFLICT (setting_key) DO NOTHING;
