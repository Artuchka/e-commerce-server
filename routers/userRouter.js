const express = require("express")
const {
	getAllUsers,
	showCurrentUser,
	getSingleUser,
	updateUser,
	updateUserPassword,
} = require("../controllers/userController")
const { roleMiddleware } = require("../middleware/authMiddleware")
const router = express.Router()

router.route("/").get(roleMiddleware("admin"), getAllUsers)

router.route("/showMe").get(showCurrentUser)
router.route("/updateUser").patch(updateUser)
router.route("/updateUserPassword").patch(updateUserPassword)

router.route("/:id").get(getSingleUser)

module.exports = { userRouter: router }
