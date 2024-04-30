const express = require("express");
const router = express.Router();
const { Chat, User } = require("../../models");

// GET route for all Chat
router.get("/", async (req, res) => {
    try {
        
        // Finds all Chat
        const chatData = await Chat.findAll();
        // Returns the data
        res.json(chatData);
        // Catches for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// GET route for one chat by id
router.get("/:id", async (req, res) => {
    try {
        const chatData = await Chat.findByPk(req.params.id);
        // Returns the data
        res.json(chatData);
        // Catches for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

//GET route for all chat by user id
router.get("/user/:id", async (req, res) => {
    try {
        const chatData = await Chat.findAll({
            where: {
                user_id: req.params.id,
            },
        });
        res.json(chatData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// POST route to create a chat
router.post("/", async (req, res) => {
    try {
        const chatData = await Chat.create({
            user_id: req.body.user_id,
            username: req.body.username,
            message: req.body.message,
            ChatRoomId: req.body.ChatRoomId
        });
        res.status(200).json(chatData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;
