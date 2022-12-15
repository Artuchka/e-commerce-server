const express = require("express")
const {
	getAllReviews,
	createReview,
	updateReview,
	deleteReview,
	getSingleReview,
} = require("../controllers/reviewController")
const router = express.Router()

router.route("/:productId").get(getAllReviews).post(createReview)

router
	.route("/:productId/:reviewId")
	.patch(updateReview)
	.delete(deleteReview)
	.get(getSingleReview)

module.exports = { reviewRouter: router }
