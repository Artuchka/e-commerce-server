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
		},
		shippingFee: {
			type: Number,
			required: [true, "please provide shippingFee"],
		},
		subtotal: {
			type: Number,
			required: [true, "please provide subtotal"],
		},
		total: {
			type: Number,
			required: [true, "please provide total"],
		},
		orderItems: {
			type: [SingleCartSchema],
			required: [true, "please provide order items"],
		},
		status: {
			type: String,
			required: [true, "please provide order items"],
			enum: {
				values: ["pending", "failed", "paid", "delivered", "canceled"],
				default: "pending",
				message: "{VALUE} is not supported for status",
			},
		},
		user: {
			type: mongoose.Types.ObjectId,
			required: [true, "please provide user who makes the order"],
			ref: "User",
		},
		clientSecret: {
			type: String,
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
