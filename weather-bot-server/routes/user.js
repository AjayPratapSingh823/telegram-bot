const express = require('express');
const auth = require('../middlewares/auth');
const axios = require('axios');
const User = require('../models/User');
const router = express.Router();

router.post('/subscribe', auth, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { subscribed: true });
        res.json({ msg: 'Subscribed to daily weather updates' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/unsubscribe', auth, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { subscribed: false });
        res.json({ msg: 'Unsubscribed from daily weather updates' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
