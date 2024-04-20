const express = require("express");
const router = express.Router();

// Session test route
router.get("/sess", (req, res) => {
    res.json(req.session)
})

module.exports = router;