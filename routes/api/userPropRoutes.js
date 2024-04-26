const express = require("express");
const router = express.Router();
const { User, Specialty, ServeLocation } = require("../../models");

// PUT request to edit users properties sans the specialties and servesLocation
router.put("/editprofile/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
        });
        user.update(req.body);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// PUT route to add a specialty to a user
router.put("/editspec/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [Specialty]
        });
        const specialties = await  Specialty.create({
            specialty: req.body.specialty,
            UserId: req.body.userId
        });
        await user.addSpecialty(specialties);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// PUT route to add a serveLocation to a user
router.put("/editloc/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [ServeLocation]
        });
        const serveLocation = await ServeLocation.create({
            location: req.body.location,
            UserId: req.body.userId
        });
        await user.addServeLocation(serveLocation);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

module.exports = router;