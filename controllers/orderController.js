const { StatusCodes } = require("http-status-codes")

const getAllOrders = async (req, res) => {
	res.status(StatusCodes.OK).json({
		orders: [],
	})
}
const getSingleOrder = async (req, res) => {
	res.status(StatusCodes.OK).json({
		order: {},
	})
}
const getCurrentUserOrders = async (req, res) => {
	res.status(StatusCodes.OK).json({
		orders: [],
	})
}
const createOrder = async (req, res) => {
	res.status(StatusCodes.OK).json({
		order: {},
	})
}

const updateOrder = async (req, res) => {
	res.status(StatusCodes.OK).json({
		order: [],
	})
}
module.exports = {
	getAllOrders,
	createOrder,
	getSingleOrder,
	getCurrentUserOrders,
	updateOrder,
}
