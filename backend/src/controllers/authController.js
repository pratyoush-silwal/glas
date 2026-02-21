const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.json({ success: true, token, user });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

const verify = async (req, res) => {
  // If middleware passes, user is verified
  res.json({ success: true, user: req.user });
};

module.exports = {
  register,
  login,
  verify
};
