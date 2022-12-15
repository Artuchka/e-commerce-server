const { StatusCodes } = require("http-status-codes")

const createProduct = async (req, res) => {
	res.status(StatusCodes.OK).json({
		msg: "created product",
	})
}

const getAllProducts = async (req, res) => {
	res.status(StatusCodes.OK).json({
		msg: "getAllProducts product",
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
