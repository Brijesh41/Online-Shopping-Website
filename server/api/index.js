const express = require('express')
const productRouter = require('./routers/product')

const app = express()
const port = 3000

app.use(express.json())
app.use(productRouter)

app.listen(port, () => {
    console.log('Server is up at port  : ' + port)
})