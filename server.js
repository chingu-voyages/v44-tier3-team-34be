import 'dotenv/config.js'
import express from 'express'

import './config/database.js'

// const express = require('express')
const app = express()

// just setting up basic routes
app.get('/api', (req, res) => {
    res.json({})
})


// setting up basic listener
app.listen(3000, () => { console.log('Server started on port 3000') })

module.exports = app;