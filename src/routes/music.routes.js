const express = require('express')
const router = express.Router()
const musicController = require('../controller/music.controller')
const authMiddleware = require('../middleware/music.middleware')
const multer = require('multer')

const upload = multer({
    storage : multer.memoryStorage()
})
router.post('/upload-music',upload.single('music'),authMiddleware.authArtist, musicController.createMusic )

router.post('/create-album',authMiddleware.authArtist, musicController.createAlbum )

router.post('/addSong-album/:albumId', authMiddleware.authArtist, musicController.addSongInAlbum)

router.get('/',authMiddleware.authUser, musicController.getAllMusic)

router.get('/album', authMiddleware.authUser, musicController.getAllAlbum)

router.get('/search-album/:id', musicController.getAlbumById)

module.exports = router