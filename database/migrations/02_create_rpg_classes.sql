-- RPG Classes
CREATE TABLE IF NOT EXISTS rpg_classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    icon_url VARCHAR(255),
    base_hp INTEGER DEFAULT 10,
    base_str INTEGER DEFAULT 10,
    base_int INTEGER DEFAULT 10,
    base_dex INTEGER DEFAULT 10,
    base_con INTEGER DEFAULT 10,
    base_wis INTEGER DEFAULT 10,
    base_cha INTEGER DEFAULT 10,
    skill_bonus VARCHAR(50)
);

-- Insert default classes
INSERT INTO rpg_classes (name, description, base_hp, base_str, base_int, base_dex, base_con, base_wis, base_cha, skill_bonus) VALUES
('Warrior', 'A strong fighter.', 12, 14, 8, 10, 14, 8, 10, 'Athletics'),
('Mage', 'A master of arcane arts.', 6, 8, 16, 10, 10, 14, 10, 'Arcana'),
('Rogue', 'A stealthy operative.', 8, 10, 12, 16, 10, 8, 14, 'Stealth'),
('Cleric', 'A divine healer.', 10, 12, 10, 8, 12, 16, 10, 'Medicine'),
('Ranger', 'A master of the wild.', 10, 10, 10, 16, 12, 12, 8, 'Survival')
ON CONFLICT (name) DO NOTHING;
