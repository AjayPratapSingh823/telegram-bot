const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../models/User');
const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/block/:id',  async (req, res) => {
    const id=req.body.id;
    try {
        await User.findByIdAndUpdate(id, { subscribed: false });
        res.json({ msg: 'false' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/unblock/:id',  async (req, res) => {
    const id=req.body.id;
    try {
        await User.findByIdAndUpdate(id, { subscribed: true });
        res.json({ msg: 'User unblocked' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
router.post('/delete/:id',  async (req, res) => {
    const id=req.body.id;
    try {
        await User.findByIdAndDelete(id);
        res.json({ msg: 'User delete' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
