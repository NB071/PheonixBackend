const router = require("express").Router();

// controller
const authController = require("../../controllers/auth")
// Your auth routes go here... 
router.post("/login", authController.sampleLogin);

module.exports = router;
