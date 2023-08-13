const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// 3. routes
const router = express.Router();

router.post("/signup", authController.signup);

module.exports = router;
