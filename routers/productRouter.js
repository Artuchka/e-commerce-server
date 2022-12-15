const express = require("express")
const {
	getAllProducts,
	createProduct,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
} = require("../controllers/productController")
const router = express.Router()

router.route("/").get(getAllProducts).post(createProduct)

router.route("/uploadImage").post(uploadImage)

router
	.route("/:id")
	.get(getSingleProduct)
	.patch(updateProduct)
	.delete(deleteProduct)

module.exports = { productRouter: router }
