const express = require("express");
const router = express.Router();
const { Chat, User } = require("../../models");

// GET route for all Chat
router.get("/", async (req, res) => {
    try {
        const data = await Chat.findAll({
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['username']
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['username']
                }
            ]
        });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// GET route for one chat by id
router.get("/:id", async (req, res) => {
    try {
        const chatData = await Chat.findByPk(req.params.id, {
            // Includes the username of the two independent users (sender, and receiver)
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['username']
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['username']
                }
            ]
        });
        // Returns the data
        res.json(chatData);
        // Catches for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// POST route to create a chat
router.post("/", async (req, res) => {
    try {
        const chatData = await Chat.create(req.body);
        res.status(200).json(chatData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// POST route to receive and decode a token
router.post("/decode", async (req, res) => {
    try {
        const { token } = req.body;
        // Decode the token
        const decodedToken = jwt.decode(token);
        res.status(200).json(decodedToken);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;
