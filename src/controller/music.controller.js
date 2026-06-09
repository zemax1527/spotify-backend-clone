const musicModel = require('../model/music.model')
const jwt = require('jsonwebtoken')
const uploadFile = require('../service/storage.service')

async function createMusic(req, res) {

    const token = req.cookies.token
    const title = req.body.title
    const file = req.file

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    if (!file) {
        return res.status(400).json({
            message: 'No file uploaded'
        })
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        if (decoded.role !== 'artist') {
            return res.status(403).json({
                message: 'Forbidden'
            })
        }

        const result = await uploadFile(
            file.buffer.toString('base64')
        )

        const music = await musicModel.create({
            url: result.url,
            title,
            artist: decoded.id
        })

        return res.status(201).json({
            message: 'Music uploaded successfully',
            id: music._id,
            url: music.url,
            title: music.title,
            artist: music.artist
        })

    } catch (err) {
        console.log(err)

        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createMusic
}