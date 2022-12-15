const { default: mongoose, Error } = require("mongoose")

const errorHandlerMiddleware = async (err, req, res, next) => {
	console.log("getting message = ", err.message)
	console.log("getting error keys  = ", Object.keys(err))
	const error = {
		message: err.message || "some error",
		statusCode: err.statusCode || 500,
	}

	if (err instanceof mongoose.Error.ValidationError) {
		error.message = err.message
		console.log("getting errr= ", err)
	}

	if (err?.code === 11000) {
		console.log("yes")
		error.message = "please provide unique email"
	}
	res.status(error.statusCode).json({
		msg: error.message,
	})
}
module.exports = { errorHandlerMiddleware }
