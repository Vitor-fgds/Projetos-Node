const express = require("express")
const router = express.Router()

const {login,dashboard} = require("../controllers/main.js")

const authenticationMiddleware = require("../middleware/auth.js")

router.get("/dashboard", authenticationMiddleware, dashboard)
router.post("/login", login)

module.exports = router

