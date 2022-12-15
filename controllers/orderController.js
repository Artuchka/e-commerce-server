const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose")
const { BadRequestError, NotFoundError } = require("../error/customError")
const { Orders } = require("../models/OrderModel")
const { Products } = require("../models/ProductModel")
const { checkPermission } = require("../utils/checkPermission")

const getAllOrders = async (req, res) => {
	const orders = await Orders.find({})

	res.status(StatusCodes.OK).json({
		orders,
	})
}
const getSingleOrder = async (req, res) => {
	const { id } = req.params
	const foundOrder = await Orders.findOne({
		_id: mongoose.Types.ObjectId(id),
	})
	if (!foundOrder) {
		throw new NotFoundError(`no such order with id = ${id}`)
	}

	checkPermission(req.user, foundOrder.user)

	res.status(StatusCodes.OK).json({
		order: foundOrder,
	})
}
const getCurrentUserOrders = async (req, res) => {
	const { UserId } = req.user

	const foundOrders = await Orders.find({
		user: mongoose.Types.ObjectId(UserId),
	})
	if (!foundOrders || foundOrders?.length < 1) {
		throw new NotFoundError(`no such order for user with id = ${UserId}`)
	}

	res.status(StatusCodes.OK).json({
		orders: foundOrders,
	})
}

const fakeStripeAPI = ({ currency, amount }) => {
	const client_secret = `someRandomSecretValueFromStripe`
	return { client_secret }
}
const createOrder = async (req, res) => {
	const { items: cartItems, shippingFee, tax } = req?.body
	if (!cartItems || cartItems.length < 1 || !tax || !shippingFee) {
		throw new BadRequestError(
			"please add items to the cart and provide cart details"
		)
	}

	let orderItems = []
	let subtotal = []

	for (const item of cartItems) {
		const foundProduct = await Products.findOne({
			_id: mongoose.Types.ObjectId(item.product),
		})
		if (!foundProduct) {
			throw new NotFoundError(`no product with id = ${item.product}`)
		}

		const { name, price, image, _id } = foundProduct
		const { amount } = item
		orderItems.push({ name, price, amount, image, product: _id })
		subtotal += amount * price
	}

	const { client_secret: clientSecret } = fakeStripeAPI({
		currency: "usd",
		amount: subtotal,
	})

	const createdOrder = await Orders.create({
		user: new mongoose.Types.ObjectId(req.user.UserId),
		tax,
		shippingFee,
		subtotal,
		total: Number(subtotal) + Number(tax) + Number(shippingFee),
		orderItems,
		clientSecret,
	})

	res.status(StatusCodes.OK).json({
		order: createdOrder,
	})
}

const updateOrder = async (req, res) => {
	const { id: orderId } = req.params
	const { paymentId } = req.body

	const foundOrder = await Orders.findOne({
		_id: mongoose.Types.ObjectId(orderId),
	})

	if (!foundOrder) {
		throw new NotFoundError(`no order with id = ${orderId}`)
	}

	foundOrder.paymentId = paymentId
	foundOrder.status = "paid"
	await foundOrder.save()

	res.status(StatusCodes.OK).json({
		order: foundOrder,
	})
}
module.exports = {
	getAllOrders,
	createOrder,
	getSingleOrder,
	getCurrentUserOrders,
	updateOrder,
}
