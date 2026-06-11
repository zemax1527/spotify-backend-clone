const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    musics : [{
        type : String,
        ref : 'music'
    }],
    artist: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
})

const albumModel = mongoose.model('album', albumSchema)

module.exports = albumModel