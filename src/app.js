const express = require('express')
const cookiesParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')

const app = express()

app.use(express.json())
app.use(cookiesParser())
app.use('/api/auth', authRoutes)

module.exports = app