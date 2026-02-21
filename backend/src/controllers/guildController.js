const db = require('../config/database');

const getAllGuilds = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM guilds WHERE is_open = true');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createGuild = async (req, res) => {
  try {
    // Simplified creation
    const { name, description } = req.body;
    const result = await db.query(
      'INSERT INTO guilds (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllGuilds,
  createGuild
};
