const { StatusCodes } = require("http-status-codes")
const { default: mongoose } = require("mongoose")
const { NotFoundError, BadRequestError } = require("../error/customError")
const { Products } = require("../models/ProductModel")
const { Reviews } = require("../models/ReviewModel")
const { checkPermission } = require("../utils/checkPermission")

const getAllReviews = async (req, res) => {
	const { productId } = req.params
	const isValidProduct = await Products.findOne({
		_id: mongoose.Types.ObjectId(productId),
	})
	if (!isValidProduct) {
		throw new NotFoundError(`no product with id = ${productId}`)
	}
	const reviews = await Reviews.find({
		product: mongoose.Types.ObjectId(productId),
	})
		.populate({ path: "product", select: "name company price" })
		.populate({ path: "user", select: "name email" })
	res.status(StatusCodes.OK).json({
		msg: "all reviews",
		amount: reviews.length,
		reviews,
	})
}
const getSingleReview = async (req, res) => {
	const { productId, reviewId } = req.params
	const isValidProduct = await Products.findOne({
		_id: mongoose.Types.ObjectId(productId),
	})
	if (!isValidProduct) {
		throw new NotFoundError(`no product with id = ${productId}`)
	}
	const foundReview = await Reviews.findOne({
		_id: mongoose.Types.ObjectId(reviewId),
		product: mongoose.Types.ObjectId(productId),
	})
	if (!foundReview) {
		throw new NotFoundError(
			`no review with id = ${reviewId} from product id=${productId}`
		)
	}
	res.status(StatusCodes.OK).json({
		msg: "single review",
		review: foundReview,
	})
}
const createReview = async (req, res) => {
	const { productId } = req.params
	const { UserId } = req.user
	const isValidProduct = await Products.findOne({
		_id: mongoose.Types.ObjectId(productId),
	})
	if (!isValidProduct) {
		throw new NotFoundError(`no product with id = ${productId}`)
	}

	const alreadyReviewed = await Reviews.findOne({
		product: productId,
		user: UserId,
	})
	if (alreadyReviewed) {
		throw new BadRequestError(
			`user with id=${UserId} already reviewed product with id = ${productId}`
		)
	}

	req.body.user = UserId
	req.body.product = productId
	const createdReview = await Reviews.create(req.body)

	res.status(StatusCodes.CREATED).json({
		msg: "all reviews",
		createdReview,
	})
}
const updateReview = async (req, res) => {
	const { productId, reviewId } = req.params
	const isProductValid = await Products.findOne({
		_id: mongoose.Types.ObjectId(productId),
	})
	if (!isProductValid) {
		throw new NotFoundError(`couldnt find a product with id = ${productId}`)
	}
	const foundReview = await Reviews.findOne({
		_id: mongoose.Types.ObjectId(reviewId),
		product: mongoose.Types.ObjectId(productId),
	})
	if (!foundReview) {
		throw new NotFoundError(
			`couldnt find a review with id = ${reviewId} \\w prodId =${productId}`
		)
	}

	checkPermission(req.user, foundReview.user)

	const allowedKeys = ["rating", "title", "comment"]
	Object.keys(req.body).forEach((key) => {
		if (allowedKeys.includes(key)) foundReview[key] = req.body[key]
	})
	await foundReview.save()

	res.status(StatusCodes.OK).json({
		msg: "all reviews",
		review: foundReview,
	})
}

const deleteReview = async (req, res) => {
	const { productId, reviewId } = req.params
	const isProductValid = await Products.findOne({
		_id: mongoose.Types.ObjectId(productId),
	})
	if (!isProductValid) {
		throw new NotFoundError(`couldnt find a product with id = ${productId}`)
	}
	const foundReview = await Reviews.findOne({
		_id: mongoose.Types.ObjectId(reviewId),
	})
	if (!foundReview) {
		throw new NotFoundError(`couldnt find a review with id = ${reviewId}`)
	}

	checkPermission(req.user, foundReview.user)

	await foundReview.remove()

	res.status(StatusCodes.OK).json({
		msg: "deleted review",
		deletedReview: foundReview,
	})
}

const getSingleProductReviews = async (req, res) => {
	const { id: productId } = req.params

	const reviews = await Reviews.find({
		product: mongoose.Types.ObjectId(productId),
	})

	res.status(StatusCodes.OK).json({ reviews })
}

module.exports = {
	getAllReviews,
	updateReview,
	deleteReview,
	createReview,
	getSingleReview,
	getSingleProductReviews,
}
