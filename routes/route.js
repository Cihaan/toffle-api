const express = require('express')
const router = express.Router()

const auth = require("./auth")
const profile = require("./profile")

//routes
router.use("/auth", auth);
router.use("/profile", profile)


module.exports = router