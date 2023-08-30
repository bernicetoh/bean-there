const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router();
router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(authController.protect, reviewController.createReview);

router
  .route("/average-rating-by-location")
  .get(reviewController.getAverageRatingGrouped);

router
  .route("/best-rated-locations")
  .get(reviewController.getBestRatedLocation);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    reviewController.deleteReview
  );

module.exports = router;
