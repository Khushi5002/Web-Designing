const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({
            message: 'Login successful',
            token
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
router.post('/logout', (req, res) => {
    res.json({
        message: 'Logout successful. Remove token from client side.'
    });
});
module.exports = router;