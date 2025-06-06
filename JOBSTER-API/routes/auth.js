const express = require('express')
const router = express.Router()
const authenticateUser = require("../middleware/authentication.js")
const { register, login, updateUser } = require('../controllers/auth')
const testUser = require("../middleware/testUser.js")
const rateLimiter = require("express-rate-limit")

const apiLimiter = rateLimiter({
    windowMs:15*60*1000,
    max: 1,
    message: {
        msg: "Too many requests from this api, please try again after 15 minutes"
    }
}

)
router.post('/register', apiLimiter, register)
router.post('/login', apiLimiter, login)
router.patch("/updateUser", authenticateUser, testUser, updateUser)

module.exports = router

