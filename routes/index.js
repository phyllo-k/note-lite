const router = require("express").Router();

// @desc    Landing page
// @route   Get /
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = router;