const express = require("express")
const { login, register, logout } = require("../controllers/authController")
const { authMiddleware } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.get("/logout", authMiddleware, logout)

module.exports = { authRouter: router }
