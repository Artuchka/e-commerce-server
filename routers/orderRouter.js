const express = require("express")
const {
	getAllOrders,
	createOrder,
	getSingleOrder,
	updateOrder,
	getCurrentUserOrders,
} = require("../controllers/orderController")
const { roleMiddleware } = require("../middleware/authMiddleware")
const router = express.Router()

router.route("/").get(roleMiddleware("admin"), getAllOrders).post(createOrder)

router.route("/showAllMyOrders").get(getCurrentUserOrders)

router.route("/:id").get(getSingleOrder).patch(updateOrder)

module.exports = { orderRouter: router }
