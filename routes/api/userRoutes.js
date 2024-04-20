const express = require("express");
const router = express.Router();
const {User} = require("../../models/index.js");
// const bcrypt = require('bcrypt')

// GET ALL
router.get("/", async (req, res) => {
    try {
        const data = await User.findAll();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
    });

// GET ONE
router.get("/:id", async (req, res) => {
    try {
        const data = await User.findByPk(req.params.id);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
    });

// CREATE
router.post("/", async (req, res) => {
    try {
        const data = await User.create({
            username: req.body.username,
            password: req.body.password,
            isPhotographer: req.body.isPhotographer,
            lastOnline: req.body.lastOnline,
            onlineStatus: req.body.onlineStatus,
            biography: req.body.biography,
            specialties: req.body.specialties,
            areaOfService: req.body.areaOfService,
        });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
    }
);

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const data = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
    });

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const data = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
    });

module.exports = router;