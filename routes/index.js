const express = require('express');
const authController = require('../controllers/authController');
const attendanceController = require('../controllers/attendanceController');

const router = express.Router();

router.use('/auth', authController);
router.use('/attendance', attendanceController);

module.exports = router;
