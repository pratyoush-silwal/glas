const express = require('express');
const router = express.Router();
const guildController = require('../controllers/guildController');
const auth = require('../middleware/auth');

router.get('/', auth, guildController.getAllGuilds);
router.post('/', auth, guildController.createGuild);

module.exports = router;
