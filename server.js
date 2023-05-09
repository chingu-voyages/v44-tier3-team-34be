const express = require('express')
const app = express()

// just setting up basic routes
app.get('/api', (req, res) => {
    res.json({})
})


// setting up basic listener
app.listen(5000, () => { console.log('Server started on port 5000') })