const { StatusCodes } = require("http-status-codes")
const { default: mongoose } = require("mongoose")
const { NotFoundError, BadRequestError } = require("../error/customError")
const { Products } = require("../models/ProductModel")
const path = require("path")

const createProduct = async (req, res) => {
	req.body.user = req.user.UserId
	const createdProduct = await Products.create(req.body)

	res.status(StatusCodes.CREATED).json({
		msg: "created product",
		product: createdProduct,
	})
}

const getAllProducts = async (req, res) => {
	const products = await Products.find({})

	res.status(StatusCodes.OK).json({
		msg: "getAllProducts product",
		products,
	})
}

const getSingleProduct = async (req, res) => {
	const { id } = req.params
	const foundProduct = await Products.findById(
		mongoose.Types.ObjectId(id)
	).populate({ path: "reviews", select: "rating comment title user" })

	if (!foundProduct) {
		throw new NotFoundError(`couldnt find the product with id=${id}`)
	}

	res.status(StatusCodes.OK).json({
		msg: "getSingleProduct product",
		product: foundProduct,
	})
}

const updateProduct = async (req, res) => {
	const { id } = req.params
	const foundProduct = await Products.findById(mongoose.Types.ObjectId(id))
	if (!foundProduct) {
		throw new NotFoundError(`couldnt find the product with id=${id}`)
	}
	Object.keys(req.body).forEach((key) => {
		foundProduct[key] = req.body[key]
	})
	await foundProduct.save()

	res.status(StatusCodes.OK).json({
		msg: "updateProduct product",
		product: foundProduct,
	})
}

const deleteProduct = async (req, res) => {
	const { id } = req.params
	const foundProduct = await Products.findById(mongoose.Types.ObjectId(id))
	if (!foundProduct) {
		throw new NotFoundError(`couldnt find the product with id=${id}`)
	}

	await foundProduct.remove()

	res.status(StatusCodes.OK).json({
		msg: "deleted product",
		product: foundProduct,
	})
}

const uploadImage = async (req, res) => {
	const image = req?.files?.image
	console.log(image)
	if (!image || !image.mimetype.match(/image\//)) {
		throw new BadRequestError(`please provide image`)
	}
	await image.mv(path.join(__dirname, "../uploads/", image.name), (err) => {
		console.log(err)
	})
	res.status(StatusCodes.CREATED).json({
		msg: "uploadImage",
		src: `/uploads/${image.name}`,
	})
}

module.exports = {
	createProduct,
	getSingleProduct,
	getAllProducts,
	updateProduct,
	uploadImage,
	deleteProduct,
}
