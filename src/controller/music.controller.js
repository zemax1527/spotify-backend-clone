const musicModel = require('../model/music.model')
const albumModel = require('../model/album.model')
const jwt = require('jsonwebtoken')
const uploadFile = require('../service/storage.service')

async function createMusic(req, res) {
    
    const title = req.body.title
    const file = req.file

    if (!file) {
        return res.status(400).json({
            message: 'No file uploaded'
        })
    }



        const result = await uploadFile(
            file.buffer.toString('base64')
        )

        const music = await musicModel.create({
            url: result.url,
            title,
            artist: req.user.id
        })

        return res.status(201).json({
            message: 'Music uploaded successfully',
            id: music._id,
            url: music.url,
            title: music.title,
            artist: music.artist
        })


}

async function createAlbum(req, res) {
        
        const { title, musicId } = req.body

        const musics = await musicModel.find({
        _id: { $in: musicId }
        })

        const isValid = musics.every( 
            music => music.artist.toString() == req.user.id.toString()
        ) 
  
        if(!isValid){
            return res.status(403).json({ message : 'you can add only own song '})
        }
        
        const isExist = await albumModel.findOne({
        artist: req.user.id,
        musics: musicId
        })

        if(isExist){
            return res.status(401).json({
                message : 'this music exist on playlist'
            })
        }

        const album = await albumModel.create({
            title,
            artist : req.user.id,
            musics : musicId
        })


        res.status(201).json({
            message : 'artist album created ',
            id : album._id,
            title : album.title,
            musics : album.musics,
            artist : req.user.id 
        })
    
}

async function getAllMusic(req, res) {
    const musics = await musicModel.find().populate('artist','username')

    res.status(200).json({
        message : 'music fetched successfully',
        musics : musics,
    })
}

async function getAllAlbum(req, res) {
    const album = await albumModel.find().populate('artist','username').populate('musics')

    res.status(200).json({
        message : 'album fetched successfully',
        album : album ,
    })
}

module.exports = {
    createMusic , createAlbum , getAllMusic ,getAllAlbum
}