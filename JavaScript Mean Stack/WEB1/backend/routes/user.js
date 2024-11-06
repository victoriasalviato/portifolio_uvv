const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred!' });
    }
});

module.exports = router;

