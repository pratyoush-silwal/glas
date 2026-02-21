const jwt = require('jsonwebtoken');
const db = require('../config/database');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if user still exists
    const result = await db.query('SELECT id, role, is_active FROM users WHERE id = $1', [decoded.id]);
    
    if (result.rows.length === 0 || !result.rows[0].is_active) {
      throw new Error();
    }

    req.currentUser = result.rows[0];
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token or user inactive.' });
  }
};

module.exports = auth;
