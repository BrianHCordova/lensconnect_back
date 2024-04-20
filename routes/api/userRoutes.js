const express = require("express");
const router = express.Router();
const { User, Specialties, ServeLocation } = require("../../models/index.js");
const bcrypt = require('bcrypt')

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
        const data = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Specialties,
                    where: {
                        UserId: req.session.userId
                    }
                },
                { model: ServeLocation }
            ]
        });
        console.log(data)
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
            // onlineStatus: req.body.onlineStatus,
            // biography: req.body.biography,
            // specialties: req.body.specialties,
            // areaOfService: req.body.areaOfService,
        });
        req.session.save(() => {
            req.session.userId = data.id;
            req.session.loggedIn = true;
            res.status(200).json(data);
            res.json(data)
        });
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

// POST request for login
router.post('/login', async (req, res) => {
    try {
        // Finds the user where the email matches the email they used to login since emails are unique
        const userData = await User.findOne(
            {
                where:
                {
                    username: req.body.username
                }
            });
        // If no user was found it sends a 400 status
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password' });
            return;
        }
        // If the password doesnt match it sends a 400 status
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: 'Incorrect email or password. Please try again!',
            });
            return;
        }
        // Saves the session data
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
        // Catch for errors
    } catch (err) {
        res.status(400).json(err);
    }
});

// Post request to logout deleting any session data
router.post('/logout', (req, res) => {
    // Checks if user is already logged in
    if (req.session.loggedIn) {
        // If they are logged in it delets the session data
        req.session.destroy(() => {
            res.status(204).json({ msg: "Logged out" });
        });
        // Catch for errors
    } else {
        res.status(404).end();
    }
});


module.exports = router;