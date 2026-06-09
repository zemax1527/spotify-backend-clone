const ImageKit = require('@imagekit/nodejs')

const imagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file) {
    const result = await imagekitClient.files.upload({
        file,
        fileName: `music_${Date.now()}.mp3`,
        folder: '/Musics'
    })

    return result
}

module.exports = uploadFile