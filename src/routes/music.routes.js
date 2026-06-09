const express = require('express')
const router = express.Router()
const musicController = require('../controller/music.controller')
const multer = require('multer')

const upload = multer({
    storage : multer.memoryStorage()
})
router.post('/upload-music',upload.single('music'), musicController.createMusic )
module.exports = router