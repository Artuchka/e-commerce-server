const { ForbiddenError } = require("../error/customError")

const checkPermission = (requestUser, resourceUserId) => {
	if (requestUser.role === "admin") return
	if (requestUser.UserId === resourceUserId.toString()) return

	throw new ForbiddenError("you r not allowed to c niether do that user")
}

module.exports = { checkPermission }
