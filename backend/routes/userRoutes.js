const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// 3. routes
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/resetPassword/:token", authController.resetPassword);

// only logged in users
router.use(authController.protect);
router.post("/updateMyPassword", authController.updateMyPassword);
router.get("/me", userController.getMe, userController.getUser);

// only admin
router.use(authController.restrictTo("admin"));
router.get("/", userController.getAllUsers);
router.route("/:id").get(userController.getUser);

module.exports = router;
