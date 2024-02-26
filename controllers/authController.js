const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = new User();

    try {
        const isAuthenticated = await user.authenticate(username, password);

        if (isAuthenticated) {
            console.log('Login successful');
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            console.log('Invalid credentials');
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
