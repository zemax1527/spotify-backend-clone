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
    const {title , musics} = req.body

     const isExist = await albumModel.findOne({
        title,
        artist: req.user.id
    });

    if (isExist) {
        return res.status(400).json({
            message: "Album already exists"
        });
    }

    const song = await musicModel.find({
        _id : { $in : musics },
        artist : req.user.id
    })

    if (song.length !== musics.length) {
        return res.status(400).json({
            message: "You can add only your own songs"
        });
    }

    const album = await albumModel.create({
          title,
          artist : req.user.id ,
          musics : musics
    })

    res.status(200).json({
        message : 'album fetched successfully',
        album : {
             id : album._id,
             title : album.title,
             artist : album.artist,
             musics : album.musics
        }
    })
}

async function addSongInAlbum(req, res) {
    const { musicId } = req.body;
    const { albumId } = req.params;

    const album = await albumModel.findById(albumId);
    

    if (!album) {
        return res.status(404).json({
            message: "Album not found"
        });
    }

    if (album.musics.some(id => id.toString() === musicId)) {
        return res.status(400).json({
            message: "Song already exists in album"
        });
    }

    album.musics.push(musicId);

    await album.save();

    res.status(200).json({
        message: "Song added successfully",
        album
    });
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

async function getAlbumById(req, res) {
    try {
        const { id } = req.params;

        const album = await albumModel
            .findById(id)
            .populate('artist')
            .populate('musics')

        if (!album) {
            return res.status(404).json({
                message: 'Album not found'
            });
        }

        res.status(200).json({
            message: 'Album fetched successfully',
            album
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}
module.exports = {
    createMusic , createAlbum , getAllMusic , getAllAlbum , getAlbumById ,
    addSongInAlbum
}