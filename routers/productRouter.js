const express = require("express")
const {
	getAllProducts,
	createProduct,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
} = require("../controllers/productController")
const { roleMiddleware } = require("../middleware/authMiddleware")
const router = express.Router()

router
	.route("/")
	.get(getAllProducts)
	.post(roleMiddleware("admin"), createProduct)

router.route("/uploadImage").post(roleMiddleware("admin"), uploadImage)

router
	.route("/:id")
	.get(getSingleProduct)
	.patch(roleMiddleware("admin"), updateProduct)
	.delete(roleMiddleware("admin"), deleteProduct)

module.exports = { productRouter: router }
