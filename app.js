const express = require("express")
require("express-async-errors")

const { connectDB } = require("./database/connect")
const { errorHandlerMiddleware } = require("./middleware/error-handler")
const { notFound } = require("./middleware/notFound")
require("dotenv").config()
const app = express()
const cookieParser = require("cookie-parser")

const morgan = require("morgan")
const { authRouter } = require("./routers/authRouter")
const { userRouter } = require("./routers/userRouter")
const { authMiddleware } = require("./middleware/authMiddleware")
const { productRouter } = require("./routers/productRouter")

const port = process.env.PORT || 3000

app.use(morgan("tiny"))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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
