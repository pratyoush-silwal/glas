-- RPG Races
CREATE TABLE IF NOT EXISTS races (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    icon_url VARCHAR(255),
    hp_bonus INTEGER DEFAULT 0,
    str_bonus INTEGER DEFAULT 0,
    int_bonus INTEGER DEFAULT 0,
    dex_bonus INTEGER DEFAULT 0,
    con_bonus INTEGER DEFAULT 0,
    wis_bonus INTEGER DEFAULT 0,
    cha_bonus INTEGER DEFAULT 0,
    special_ability VARCHAR(100)
);

-- Insert default races
INSERT INTO races (name, description, hp_bonus, str_bonus, int_bonus, dex_bonus, con_bonus, wis_bonus, cha_bonus, special_ability) VALUES
('Human', 'Versatile and ambitious.', 0, 1, 1, 1, 1, 1, 1, 'Adaptability'),
('Elf', 'Graceful and magical.', 0, 0, 1, 2, 0, 0, 0, 'Darkvision'),
('Dwarf', 'Bold and hardy.', 2, 2, 0, 0, 2, 0, 0, 'Dwarven Resilience'),
('Orc', 'Fierce and strong.', 2, 2, -1, 0, 1, 0, 0, 'Aggressive'),
('Halfling', 'Small and lucky.', 0, 0, 0, 2, 0, 0, 1, 'Lucky')
ON CONFLICT (name) DO NOTHING;
