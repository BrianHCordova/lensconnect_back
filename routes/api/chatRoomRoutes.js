const express = require("express");
const router = express.Router();
const { ChatRoom } = require("../../models");

// GET route for all ChatRoom
router.get("/", async (req, res) => {
    try {
        // Finds all ChatRoom
        const chatRoomData = await ChatRoom.findAll();
        // Returns the data
        res.json(chatRoomData);
        // Catches for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "chatroom error occurred", err });
    }
});

// GET route for one chatRoom by id
router.get("/:id", async (req, res) => {
    try {
        const chatRoomData = await ChatRoom.findByPk(req.params.id);
        // Returns the data
        res.json(chatRoomData);
        // Catches for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "chatroom error occurred", err });
    }
});

// POST route to create a chatRoom
router.post("/", async (req, res) => {
    try {
        const chatRoomData = await ChatRoom.create({
            room_name: req.body.room_name,
        });
        res.status(200).json(chatRoomData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


module.exports = router;