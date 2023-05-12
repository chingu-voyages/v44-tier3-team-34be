import 'dotenv/config.js'
import express from 'express'

// connect to MongoDB with mongoose
import './config/database.js'

// import routes
import { router as authRouter } from './routes/auth.js'

// create express app
const app = express()

// just setting up basic routes
app.get('/api', (req, res) => {
    res.json({})
})


// setting up basic listener
app.listen(3000, () => { console.log('Server started on port 3000') })

module.exports = app;