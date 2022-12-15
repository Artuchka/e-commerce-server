const { StatusCodes } = require("http-status-codes")
const {
	BadRequestError,
	NotFoundError,
	UnauthError,
} = require("../error/customError")
const { Users } = require("../models/UserModel")
const { attachCookieToResponse, clearCookieToken } = require("../utils/cookie")

const login = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		throw new BadRequestError("Please provide email and password")
	}

	const foundUser = await Users.findOne({ email })
	if (!foundUser) {
		throw new NotFoundError(`No user with email=${email}`)
	}
	const isPassMatch = await foundUser.comparePasswords(password)
	if (!isPassMatch) {
		throw new UnauthError("Invalid credentials")
	}

	const token = await foundUser.getToken()
	attachCookieToResponse(res, token)

	res.status(StatusCodes.OK).json({
		msg: "login",
	})
}

const register = async (req, res) => {
	const { name, email, password } = req.body
	const user = await Users.create({ name, email, password })

	const token = await user.getToken()

	attachCookieToResponse(res, token)
	res.status(StatusCodes.OK).json({
		msg: "register",
		user,
	})
}
const logout = async (req, res) => {
	clearCookieToken(res)
	res.status(StatusCodes.OK).json({
		msg: "logouted",
	})
}

module.exports = { login, register, logout }
