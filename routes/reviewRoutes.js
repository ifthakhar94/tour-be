const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviewController");

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(protect, restrictTo("user"), reviewController.setTourUserIds, reviewController.createReview);

router
  .route("/:id")
  .patch(protect, restrictTo("user", "admin"), reviewController.updateReview)
  .delete(protect, restrictTo("user", "admin"), reviewController.deleteReview);

module.exports = router;