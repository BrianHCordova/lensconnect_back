const express = require("express");
const router = express.Router();
const { User, Specialty, ServeLocation, Review } = require("../../models/index.js");

router.get("/", async (req, res) => {
    try {
        const data = await User.findAll({
            include: [Review, ServeLocation, Specialty],
            where: {
                isPhotographer: true
            }
        });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

router.get("/featured", async (req, res) => {
    try {
        const data = await User.findAll({
            include: [Review, ServeLocation, Specialty],
            where: {
                isPhotographer: true 
            },
            order: [
                ['averageRating', 'DESC'],
            ],
        });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});


module.exports = router;