const { StatusCodes } = require("http-status-codes")

class CustomError extends Error {
	constructor(statusCode, message) {
		super(message)
		this.statusCode = statusCode
	}
}

class UnauthError extends CustomError {
	constructor(message) {
		super(StatusCodes.UNAUTHORIZED, message)
	}
}

class NotFoundError extends CustomError {
	constructor(message) {
		super(StatusCodes.NOT_FOUND, message)
	}
}

class BadRequestError extends CustomError {
	constructor(message) {
		super(StatusCodes.BAD_REQUEST, message)
	}
}
class ForbiddenError extends CustomError {
	constructor(message) {
		super(StatusCodes.FORBIDDEN, message)
	}
}

module.exports = {
	CustomError,
	UnauthError,
	NotFoundError,
	BadRequestError,
	ForbiddenError,
}
