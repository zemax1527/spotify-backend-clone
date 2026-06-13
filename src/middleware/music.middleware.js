const jwt = require('jsonwebtoken')

async function authArtist(req, res, next) {
    const token = req.cookies.token
    
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    try{
     const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            )
    
            if (decoded.role !== 'artist') {
                return res.status(403).json({
                    message: 'Forbidden'
                })
            }
            
               req.user = decoded
               next()

        }catch (err) {
        console.log(err)

        return res.status(500).json({
            message: err.message
        })
         
}
}

async function authUser(req, res, next) {
    const token = req.cookies.token
    
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    try{
     const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            )
    
            if (decoded.role !== 'user') {
                return res.status(403).json({
                    message: 'you dont has acess'
                })
            }
               next()

               req.user = decoded
        }catch (err) {
        console.log(err)

        return res.status(500).json({
            message: err.message
        })
         
}
}
module.exports = { authArtist , authUser }