const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');

router.post('/clock-in', async (req, res) => {
    const { employeeId } = req.body;
    const attendance = new Attendance();

    try {
        await attendance.clockIn(employeeId);
        console.log('Clock-in successful');
        res.status(200).json({ success: true, message: 'Clock-in successful' });
    } catch (error) {
        console.error('Error during clock-in:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/clock-out', async (req, res) => {
    const { employeeId } = req.body;
    const attendance = new Attendance();

    try {
        await attendance.clockOut(employeeId);
        console.log('Clock-out successful');
        res.status(200).json({ success: true, message: 'Clock-out successful' });
    } catch (error) {
        console.error('Error during clock-out:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
