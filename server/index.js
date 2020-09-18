const path = require('path')
const express = require('express')

const app = express()

const port = 3000
const public_dir = path.join(__dirname, '../client/public')

app.use(express.static(public_dir))

app.get('/demo', (req, res) => {
    res.render('demo')
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})