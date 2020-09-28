const express = require('express')
const productRouter = require('./routers/product')
const userRouter = require('./routers/user')

const app = express()
const port = 3000

app.use(express.json())
app.use(productRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up at port  : ' + port)
})