require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB()

app.listen( process.env.PORT , (req, res)=>{
    console.log('Server started successfully -21')
})