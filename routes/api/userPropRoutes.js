const express = require("express");
const router = express.Router();
const { User, Specialty, ServeLocation } = require("../../models");

// PUT request to edit users properties sans the specialties and servesLocation
router.put("/editprofile/:id", async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        
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
        const specialties = await Specialty.create({
            specialty: req.body.specialty,
            userId: req.body.userId
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

// DELETE route to delete a specialty of a user
router.delete("/deletespec/:userid/:spec", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userid, {
            include: [Specialty]
        });
        const specialties = await Specialty.findByPk(req.params.spec);
            await user.removeSpecialty(specialties);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// DELETE route to delete a serveLocation of a user
router.delete("/deleteloc/:userid/:loc", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userid, {
            include: [ServeLocation]
        });
        const serveLocation = await ServeLocation.findByPk(req.params.loc);;
            await user.removeServeLocation(serveLocation);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

module.exports = router;