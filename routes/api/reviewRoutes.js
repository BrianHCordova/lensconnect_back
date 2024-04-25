const express = require("express");
const router = express.Router();
const { Review, User } = require("../../models");

// GET route for all Review
router.get("/", async (req, res) => {
    try {
        // Finds all Review
        const reviewData = await Review.findAll();
        // Returns the data
        res.json(reviewData);
        // Catches for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// GET route for one review by id
router.get("/:id", async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id, {
            // Includes the username of the two independent users (reviewer, and reviewee)
            include: [
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
            ]
        });
        // Returns the data
        res.json(reviewData);
        // Catches for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// POST route to create a review
router.post("/", async (req, res) => {
    try {
        // Posts the review content and rating
        const reviewData = await Review.create({
            review: req.body.review,
            rating: req.body.rating,
        });
        // Finds the reviewee, who the review is being write about, and is sent in the post request as 'revieeeId'
        const reviewee = await User.findByPk(req.body.revieweeId)
        // Finds the reviwer. who is the current session (logged-in) user
        const reviewer = await User.findByPk(req.session.userId)
        // Sets each user to their respective role in the review model
        await reviewData.setReviewee(reviewee)
        await reviewData.setReviewer(reviewer)
        await reviewer.addReview(reviewData)
        // Returns the data
        res.json(reviewData);
        // Cathes for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
}
);

// PUT route to update a review
router.put("/:id", async (req, res) => {
    try {
        const reviewData = await Review.update(
            // Can only update rating and review, the review and reviewee cannot be updated.
            {
                review: req.body.review,
                rating: req.body.rating
            }, {
            // Finds the id of the user being updated
            where: {
                id: req.params.id,
            },
        });
        // Sends back the data
        res.json(reviewData);
        // Catch for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// DELETE route to delete a review
router.delete("/:id", async (req, res) => {
    try {
        const reviewData = await Review.destroy({
            // Finds the id of the user being deleted
            where: {
                id: req.params.id,
            },
        });
        // Returns the message below
        res.json({ msg: "Review has been deleted" });
        // Catch for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// GET route to et reviews by the reviewee id
router.get("/reviewee/:id", async (req, res) => {
    try {
        // Finds all Review
        const reviewData = await Review.findAll({
            include: [
                {
                    model: User,
                    as: 'reviewer',
                    attributes: ['username']
                }
            ],
            where: {
                revieweeId: req.params.id
            }
            
        });
        // Returns the data
        res.json(reviewData);
        // Catches for errors
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

module.exports = router;