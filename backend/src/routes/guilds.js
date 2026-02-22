const express = require('express');
const router = express.Router();
const guildController = require('../controllers/guildController');
const auth = require('../middleware/auth');

router.get('/', auth, guildController.getAllGuilds);
router.post('/', auth, guildController.createGuild);
router.post('/join', auth, guildController.joinGuild);
router.get('/my-guild', auth, guildController.getStudentGuild);

module.exports = router;
