const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// 3. routes
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
module.exports = router;
