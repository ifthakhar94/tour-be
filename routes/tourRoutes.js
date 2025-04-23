const express = require("express");
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");
const { protect, restrictTo } = require("../controllers/authController");

const reviewRouter = require("./reviewRoutes");



const router = express.Router();

router.use("/:tourId/reviews", reviewRouter );

router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

router.route("/tour-stats").get(getTourStats);
router.route("/monthly-plan/:year").get(getMonthlyPlan);
router.route("/").get(protect, getAllTours).post(protect, restrictTo("admin", "lead-guide"), createTour);

router
  .route("/:id")
  .get(protect, getTour)
  .patch(protect, restrictTo("admin", "lead-guide"), updateTour)
  .delete(protect, restrictTo("admin"), deleteTour);

// router.route("/:tourId/reviews").post(protect, restrictTo("user"), createReview);

module.exports = router;
