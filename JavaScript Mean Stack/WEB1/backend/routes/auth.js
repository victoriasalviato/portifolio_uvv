const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const router = new express.Router();

// User registration
router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
        termos: req.body.termos,
        sexo: req.body.sexo,
        dataNascimento: req.body.dataNascimento
    });
    try {
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        res.send({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send('Unable to login');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        res.send({ token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/test', auth, async (req, res) => {
    try {
        return res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;


