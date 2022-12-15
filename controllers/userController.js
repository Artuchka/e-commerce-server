const { StatusCodes } = require("http-status-codes")
const { default: mongoose } = require("mongoose")
const { NotFoundError, BadRequestError } = require("../error/customError")
const { Users } = require("../models/UserModel")
const { attachCookieToResponse } = require("../utils/cookie")
const { createTokenUser } = require("../utils/token")

const getAllUsers = async (req, res) => {
	const users = await Users.find({ role: "user" }).select("-password")
	res.status(StatusCodes.OK).json({
		users,
		msg: "all here",
	})
}
const getSingleUser = async (req, res) => {
	const { id } = req.params
	const foundUser = await Users.findOne({
		_id: new mongoose.Types.ObjectId(id),
	}).select("-password")
	if (!foundUser) {
		throw new NotFoundError(`couldnt find a user with id = ${id}`)
	}

	res.status(StatusCodes.OK).json({
		user: foundUser,
		msg: "single here",
	})
}
const showCurrentUser = async (req, res) => {
	const { user } = req

	res.status(StatusCodes.OK).json({
		user,
		msg: "current user",
	})
}

const updateUser = async (req, res) => {
	const { name, email } = req.body
	if (!name && !email) {
		throw new BadRequestError(
			"please provide at least one parameter: `email` or `password`"
		)
	}

	const updatedUserInfo = {}
	if (email) {
		updatedUserInfo.email = email
	}
	if (name) {
		updatedUserInfo.name = name
	}

	const { UserId } = req.user
	const updatedUser = await Users.findOneAndUpdate(
		{ _id: UserId },
		updatedUserInfo,
		{ new: true, runValidators: true }
	)

	const token = await updatedUser.getToken()
	attachCookieToResponse(res, token)

	res.status(StatusCodes.OK).json({
		user: updatedUser,
		msg: "user updated",
	})
}

const updateUserPassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body
	console.log({ oldPassword, newPassword })
	if (!oldPassword || !newPassword) {
		throw new BadRequestError("please provide old and new passwords")
	}

	const { UserId } = req.user

	const foundUser = await Users.findOne({ _id: UserId })
	if (!foundUser) {
		throw new NotFoundError(`couldn't find a user with id = ${UserId}`)
	}

	const isOldMatch = await foundUser.comparePasswords(oldPassword)
	if (!isOldMatch) {
		throw new BadRequestError(`Old password invalid`)
	}

	foundUser.password = newPassword
	await foundUser.save()

	res.status(StatusCodes.OK).json({
		msg: "pass updated",
	})
}

module.exports = {
	getAllUsers,
	getSingleUser,
	updateUser,
	updateUserPassword,
	showCurrentUser,
}
