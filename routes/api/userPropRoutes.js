const express = require("express");
const router = express.Router();
const { User, Specialties, ServeLocation } = require("../../models");

// PUT request to edit users properties
router.put("/editprofile/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [Specialties, ServeLocation]
        });
        user.update({
            biography: req.body.biography,
            isPhotographer: req.body.isPhotographer
        });
        const specialties = await  Specialties.create({
            specialty: req.body.specialty,
            UserId: req.session.userId
        });
        const serveLocation = await ServeLocation.create({
            location: req.body.location,
            UserId: req.session.userId
        });

        await user.addUserservelocation(serveLocation);
        await user.addUserspecialty(specialties);

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

module.exports = router;