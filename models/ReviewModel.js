const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema(
	{
		rating: {
			type: Number,
			required: [true, "please provide rating"],
			default: 5,
			min: 1,
			max: 5,
		},
		title: {
			type: String,
			required: [true, "please provide title"],
			maxlength: [100, "trim up to 100 chars"],
		},
		comment: {
			type: String,
			required: [true, "please provide comment"],
			maxlength: [1000, "trim up to 1000 chars"],
		},
		user: {
			type: mongoose.Types.ObjectId,
			required: [
				true,
				"please provide `user` id, who created the comment",
			],
			ref: "User",
		},
		product: {
			type: mongoose.Types.ObjectId,
			required: [
				true,
				"please provide `product` id, to which created the comment",
			],
			ref: "Product",
		},
	},
	{ timestamps: true }
)

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

const Reviews = new mongoose.model("Review", ReviewSchema)

module.exports = { Reviews }
