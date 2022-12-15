const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "please provide name"],
			trim: true,
			maxlength: [100, "trim the name up to 100 chars"],
		},
		price: {
			type: Number,
			required: [true, "please provide price"],
			default: 0,
		},
		description: {
			type: String,
			required: [true, "please provide description"],
			trim: true,
			maxlength: [1000, "trim the desc up to 1000 chars"],
		},
		image: {
			type: String,
			required: [true, "please provide image"],
			trim: true,
			default: "/uploads/default.jpeg",
		},
		category: {
			type: String,
			required: [true, "please provide category"],
			enum: ["office", "kitchen", "bedroom"],
		},
		company: {
			type: String,
			required: [true, "please provide company"],
			enum: {
				values: ["ikea", "liddy", "marcos"],
				message: `{VALUE} is not supported`,
			},
		},
		colors: {
			type: [String],
			required: [true, "please provide colors"],
			default: ["#222"],
		},
		featured: {
			type: Boolean,
			required: [true, "please provide features"],
			default: false,
		},
		freeShipping: {
			type: Boolean,
			required: [true, "please provide freeShipping"],
			default: false,
		},
		inventory: {
			type: Number,
			required: [true, "please provide inventory"],
			default: 15,
		},
		averageRating: {
			type: Number,
			required: [true, "please provide averageRating"],
			default: 0,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
)

const Products = new mongoose.model("Product", ProductSchema)

module.exports = { Products }
