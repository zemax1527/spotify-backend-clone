const express = require('express')
const router = express.Router()
const authControl = require('../controller/auth.controller')

router.post('/register', authControl.registerUser)

module.exports = router