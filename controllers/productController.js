const { StatusCodes } = require("http-status-codes")
const { default: mongoose } = require("mongoose")
const { NotFoundError } = require("../error/customError")
const { Products } = require("../models/ProductModel")

const createProduct = async (req, res) => {
	req.body.user = req.user.UserId
	const createdProduct = await Products.create(req.body)

	res.status(StatusCodes.OK).json({
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
	const foundProduct = await Products.findById(mongoose.Types.ObjectId(id))
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
	const foundProduct = await Products.findByIdAndDelete(
		mongoose.Types.ObjectId(id)
	)
	if (!foundProduct) {
		throw new NotFoundError(`couldnt find the product with id=${id}`)
	}

	foundProduct.delete()
	res.status(StatusCodes.OK).json({
		msg: "deleted product",
		product: foundProduct,
	})
}

const uploadImage = async (req, res) => {
	res.status(StatusCodes.OK).json({
		msg: "uploadImage",
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
