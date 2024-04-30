const express = require("express");
const router = express.Router();
const { TransactionReport, User } = require("../../models");

// GET route for all Review
router.get("/", async (req, res) => {
    try {
        
        // Finds all Review
        const transactionData = await TransactionReport.findAll({
            include: [
                {
                    model: User,
                    as: 'hirer',
                    attributes: ['username']
                },
                {
                    model: User,
                    as: 'hiree',
                    attributes: ['username']
                }
            ]
        });
        // Returns the data
        res.json(transactionData);
        // Catches for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// GET route for one review by id
router.get("/:id", async (req, res) => {
    try {
        const transactionData = await TransactionReport.findByPk(req.params.id, {
            // Includes the username of the two independent users (reviewer, and reviewee)
            include: [
                {
                    model: User,
                    as: 'hirer',
                    attributes: ['username']
                },
                {
                    model: User,
                    as: 'hiree',
                    attributes: ['username']
                }
            ]
        });
        // Returns the data
        res.json(transactionData);
        // Catches for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// POST route to create a report
router.post("/", async (req, res) => {
    try {
        // Posts the review content and rating
        const transactionData = await TransactionReport.create({
            paid: req.body.paid,
            voluntary: req.body.voluntary,
            comment: req.body.comment,
        });
        // Finds the reviewee, who the review is being write about, and is sent in the post request as 'revieeeId'
        const hirer = await User.findByPk(req.body.hirerId)
        // Finds the reviwer. who is the current (logged-in) user
        const hiree = await User.findByPk(req.body.userId)
        // Sets each user to their respective role in the review model
        await transactionData.setHirer(hirer)
        await transactionData.setHiree(hiree)
        await hiree.addTransactionReport(transactionData)
        // Returns the data
        res.json(transactionData);
        // Cathes for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
}
);

module.exports = router;