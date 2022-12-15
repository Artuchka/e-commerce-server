const { StatusCodes } = require("http-status-codes")
const { default: mongoose } = require("mongoose")
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
	res.status(StatusCodes.OK).json({
		msg: "getSingleProduct product",
	})
}

const updateProduct = async (req, res) => {
	res.status(StatusCodes.OK).json({
		msg: "updateProduct product",
	})
}

const deleteProduct = async (req, res) => {
	res.status(StatusCodes.OK).json({
		msg: "updateProduct product",
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
