const router = require("express").Router();

// @desc    Google Oauth2.0
// @route   Get /auth/google
router.get("/google", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = router;