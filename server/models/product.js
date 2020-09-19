const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId  : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    manufacturer : {
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    sellerId : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
        maxlength : 50
    },
    price : {
        type: Number
    },
    unit : {
        type : String,
        required : true
    },
    quantity : {
        type: Number
    },
    image : {
        type : Buffer
    }
})

const Product =  mongoose.model('Product', productSchema)

module.exports = Product