const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/users', auth, adminController.getUsers);
router.get('/system/settings', auth, adminController.getSettings);

module.exports = router;
