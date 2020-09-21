const express = require('express')
require('../../db/mogoose')
const router = new express.Router()
const Product = require('../../models/product')

router.post('/product', async (req, res) => {
    const product = new Product(req.body)
    try{
        await product.save()
        res.status(201).send(product)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/product/:id', async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findOne( { productId : id })
        if(!product) {
            res.status(404).send()
        }
        res.send(product)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router