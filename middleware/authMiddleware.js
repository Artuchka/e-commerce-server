const {
	UnauthError,
	BadRequestError,
	ForbiddenError,
} = require("../error/customError")
const { Users, decodeToken } = require("../models/UserModel")

const authMiddleware = async (req, res, next) => {
	console.log("authMiddleware")
	if (!req?.signedCookies?.token) {
		throw new UnauthError("you dont have permission for this route")
	}

	const decoded = await decodeToken({ token: req.signedCookies.token })
	console.log(decoded)
	if (!decoded?.UserId) {
		throw new BadRequestError("bad token in cookies")
	}
	const { UserId, name, role } = decoded
	req.user = { UserId, name, role }

	next()
}
const roleMiddleware = (...allowedRoles) => {
	return async (req, res, next) => {
		console.log("role middleware")

		if (!allowedRoles.includes(req.user.role)) {
			throw new ForbiddenError("you dont have permission for this route")
		}

		next()
	}
}

module.exports = { authMiddleware, roleMiddleware }
