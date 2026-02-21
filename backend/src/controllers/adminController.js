const db = require('../config/database');

const getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, email, role, is_active FROM users ORDER BY id');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getSettings = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM system_settings');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getUsers,
  getSettings
};
