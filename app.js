const cors = require("cors")
const rateLimiter = require("express-rate-limit")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")

const express = require("express")
require("express-async-errors")
const fileUpload = require("express-fileupload")

const { connectDB } = require("./database/connect")
const { errorHandlerMiddleware } = require("./middleware/error-handler")
const { notFound } = require("./middleware/notFound")
require("dotenv").config()
const app = express()
const cookieParser = require("cookie-parser")
app.set("proxy", 1)
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 60,
	})
)

app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

const morgan = require("morgan")
const { authRouter } = require("./routers/authRouter")
const { userRouter } = require("./routers/userRouter")
const { authMiddleware } = require("./middleware/authMiddleware")
const { productRouter } = require("./routers/productRouter")
const { reviewRouter } = require("./routers/reviewRouter")
const { orderRouter } = require("./routers/orderRouter")

const port = process.env.PORT || 3000

app.use(morgan("tiny"))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload())
app.use(express.static("./public"))

app.get("/", (req, res) => {
	res.status(200).send(`
        <h1>hello on main route</h1>
    `)
})
app.get("/api/v1", (req, res) => {
	// console.log("cookies = ", req.cookies)
	console.log("signed cookies = ", req.signedCookies)
	res.status(200).send(`
        <h1>hello on main route</h1>
    `)
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", authMiddleware, userRouter)
app.use("/api/v1/products", authMiddleware, productRouter)
app.use("/api/v1/reviews", authMiddleware, reviewRouter)
app.use("/api/v1/orders", authMiddleware, orderRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL)
		console.log("connected")

		app.listen(port, () => {
			console.log(`listening on port=${port}`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
