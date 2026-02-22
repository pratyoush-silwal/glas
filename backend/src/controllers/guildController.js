const db = require('../config/database');
const studentService = require('../services/studentService');

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
    const { name, description } = req.body;
    const profile = await studentService.getProfile(req.user.id);
    if (!profile) throw new Error('Student profile not found');
    const studentId = profile.id;

    const result = await db.query(
      'INSERT INTO guilds (name, description, guild_master_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, studentId]
    );
    
    await db.query(
      'INSERT INTO guild_memberships (guild_id, student_id, role) VALUES ($1, $2, $3)',
      [result.rows[0].id, studentId, 'guild_master']
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const joinGuild = async (req, res) => {
  try {
    const { guildId } = req.body;
    const profile = await studentService.getProfile(req.user.id);
    if (!profile) throw new Error('Student profile not found');
    const studentId = profile.id;
    
    const check = await db.query('SELECT * FROM guild_memberships WHERE student_id = $1', [studentId]);
    if (check.rows.length > 0) {
      return res.status(400).json({ success: false, error: 'Already in a guild' });
    }

    await db.query(
      'INSERT INTO guild_memberships (guild_id, student_id, role) VALUES ($1, $2, $3)',
      [guildId, studentId, 'member']
    );

    await db.query('UPDATE guilds SET members_count = members_count + 1 WHERE id = $1', [guildId]);

    res.json({ success: true, message: 'Joined guild!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getStudentGuild = async (req, res) => {
  try {
    const profile = await studentService.getProfile(req.user.id);
    if (!profile) throw new Error('Student profile not found');
    const studentId = profile.id;

    const result = await db.query(
      `SELECT g.*, gm.role 
       FROM guilds g 
       JOIN guild_memberships gm ON g.id = gm.guild_id 
       WHERE gm.student_id = $1`,
      [studentId]
    );
    res.json({ success: true, data: result.rows[0] || null });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllGuilds,
  createGuild,
  joinGuild,
  getStudentGuild
};
