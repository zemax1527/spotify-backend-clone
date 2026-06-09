const mongoose = require('mongoose')

async function connectDB() {
    
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected')
    }catch(err){
        console.error('Database connection error : ', err)
    }
    
}

module.exports = connectDB