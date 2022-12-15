const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { createTokenUser } = require("../utils/token")

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "please provide name"],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: [true, "please provide email"],
		validate: {
			message: "please provide VALID email",
			validator: validator.isEmail,
		},
		unique: true,
	},
	password: {
		type: String,
		required: [true, "please provide password"],
		minlength: 6,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
})

UserSchema.pre("save", async function (next) {
	console.log("saving new pass = ", this.password)
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(this.password, salt)
	this.password = hashedPassword
	next()
})

UserSchema.methods.comparePasswords = async function (candidate) {
	return await bcrypt.compare(candidate, this.password)
}

UserSchema.methods.getToken = async function () {
	const tokenUser = createTokenUser(this)
	const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	})
	return token
}

const decodeToken = async ({ token }) => {
	return await jwt.verify(token, process.env.JWT_SECRET)
}

const Users = mongoose.model("User", UserSchema)

module.exports = { Users, decodeToken }
