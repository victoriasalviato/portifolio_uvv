const express = require('express');
const router = express.Router();

const Message = require('../model/message');
const auth = require("../middleware/auth");

router.get('/', auth, async (req, res, next) => {
    try {
        const messages = await Message.find({ user: { $exists: true } }).populate('user', 'name _id');
        res.json({
            message: 'Messages fetched successfully!',
            data: messages
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred!',
            error: err
        });
    }
});

router.post('/', auth, async (req, res, next) => {
    const newMessage = new Message(req.body);
    try {
        const message = await newMessage.save();
        const messageResponse = await Message
            .findById(message._id)
            .populate('user', 'name _id');
        res.status(201).json({
            message: 'Message saved successfully!',
            data: messageResponse
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred!',
            error: err
        });
    }
});

router.put('/:id', auth, async (req, res, next) => {
    const id = req.params.id;
    const content = req.body.content;
    try {
        const message = await Message.findOneAndUpdate({ _id: id },
            {
                content: content,
                updatedAt: Date.now()
            },
            { new: true }
        ).populate('user', 'name _id');
        res.json({
            message: 'Message updated successfully!',
            data: message
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred!',
            error: err
        });
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    const id = req.params.id;
    try {
        const message = await Message.findByIdAndDelete(id);
        res.json({
            message: 'Message deleted successfully!',
            data: id
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred!',
            error: err
        });
    }
});

module.exports = router;

