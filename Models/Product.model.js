const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id  : {
        type : String,
        required : true,
        unique : true
    },
    CategoryName : {
        type:String,
        required: true
    },
    SeoTags :{
        type: String,
        required: true
    },
    ProductName: {
        type: String,
        required:true
    }
});

const Product =  mongoose.model('Product', productSchema)

module.exports = Product


// Actual Data

// Units Array
// Tags Null
// ProductExtraFields Null
// ProductVariantAttributeGroups Null
// ProductAttributes Null
// ProductDetails Array
// ProductVariantMedia Null


