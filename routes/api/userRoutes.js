const express = require("express");
const router = express.Router();
const { User, Specialty, ServeLocation, Review } = require("../../models/index.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// GET ALL
router.get("/", async (req, res) => {
    try {
        const data = await User.findAll({
            include: [Specialty, ServeLocation]
        });
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
            include: [Specialty, ServeLocation, 
                // Adds the reviewee and reviewer usernames for the reviews
                {model: Review,  include: [
                    {
                        model: User,
                        as: 'reviewer',
                        attributes: ['username']
                    },
                    {
                        model: User,
                        as: 'reviewee',
                        attributes: ['username']
                    }
                ]}
            ]
            
        });
        console.log(data) 
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

router.get("/byusername/:username", async (req, res) => {
    try {
        const data = await User.findOne({
            where: {
                username: req.params.username
            }
        });
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
            email: req.body.email,
            isPhotographer: req.body.isPhotographer,
            lastOnline: req.body.lastOnline,
            biography: req.body.biography,
            // specialties: req.body.specialties,
            // areaOfService: req.body.areaOfService,
        });

        const token = await jwt.sign(
            {
                id: data.id,
                email: data.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        )
        res.json({
            token,
            user: data
        })
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
        res.json({msg: "User has been deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// POST request for login
router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        // Finds the user where the email matches the email they used to login since emails are unique
        const userData = await User.findOne(
            {
                where:
                {
                    // username: req.body.username,
                    email: req.body.email
                }
            });
        // If no user was found it sends a 400 status
        if (!userData) {
            res
                .status(401)
                .json({ message: 'Incorrect email or password' });
            return;
        }
        // If the password doesnt match it sends a 400 status
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(401).json({
                message: 'Incorrect email or password. Please try again!',
            });
            return;
        }
        // Saves the session data
        const token = jwt.sign(
            {
                id: userData.id,
                email: userData.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        )
        res.json({
           token,
            user: userData
        })
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

router.put("/verify/:id", async (req, res) => {
    try {
        const userData = await User.findOne(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!bcrypt.compareSync(req.body.password, userData.password)) {
            res.status(400).json({ message: 'Incorrect email or password' });
            res.json(false);
            return
          }
        //   const validPassword = await userData.checkPassword(req.body.password);
        //   if (!validPassword) {
        //       res.status(401).json({
        //           message: 'Incorrect email or password. Please try again!',
        //       });
        //       return;
        //   }
        res.json(true);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});


module.exports = router;