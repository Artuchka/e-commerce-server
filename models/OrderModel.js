const mongoose = require("mongoose")
const SingleCartSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	product: {
		type: mongoose.Types.ObjectId,
		required: [true, "please provide user who makes the order"],
		ref: "Product",
	},
})

const OrderSchema = new mongoose.Schema(
	{
		tax: {
			type: Number,
			required: [true, "please provide tax"],
			default: 0,
		},
		shippingFee: {
			type: Number,
			required: [true, "please provide shippingFee"],
			default: 0,
		},
		subtotal: {
			type: Number,
			required: [true, "please provide subtotal"],
			default: 0,
		},
		total: {
			type: Number,
			required: [true, "please provide total"],
			default: 0,
		},
		orderItems: {
			type: [SingleCartSchema],
			required: [true, "please provide order items"],
			default: [],
		},
		status: {
			type: String,
			required: [true, "please provide order items"],
			enum: {
				values: ["pending", "failed", "paid", "delivered", "canceled"],
				message: "{VALUE} is not supported for status",
			},
			default: "pending",
		},
		user: {
			type: mongoose.Types.ObjectId,
			required: [true, "please provide user who makes the order"],
			ref: "User",
		},
		clientSecret: {
			type: String,
			default: "placeholder",
			required: [true, "please provide clientSecret who makes the order"],
		},
		paymentId: {
			type: String,
		},
	},
	{ timestamps: true }
)

const OrderModel = new mongoose.model("Order", OrderSchema)

module.exports = { Orders: OrderModel }
