const { StatusCodes } = require("http-status-codes")
const { Types, default: mongoose } = require("mongoose")
const { BadRequestError } = require("../error/customError")
const { Orders } = require("../models/OrderModel")
const { Products } = require("../models/ProductModel")

const getAllOrders = async (req, res) => {
	const orders = await Orders.find({})

	res.status(StatusCodes.OK).json({
		orders,
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
	const { items: cartItems, shippingFee, tax } = req?.body
	if (!cartItems || cartItems.length < 1 || !tax || !shippingFee)
		throw new BadRequestError("please add items to the art")
	const isAllGood = req.body.items.map(async (item) => {
		const found = Products.find({
			_id: Types.ObjectId(item.product),
		})
		if (!found) {
			throw new BadRequestError("please send only existing products")
		}
	})

	const createdOrder = await Orders.create({
		...req.body,
		user: mongoose.Types.ObjectId(req.user.UserId),
	})

	res.status(StatusCodes.OK).json({
		order: createdOrder,
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
