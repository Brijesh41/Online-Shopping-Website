const mogoose = require('mongoose')

mogoose.connect('mongodb://127.0.0.1:27017/ecommerce', { useNewUrlParser : true , useUnifiedTopology : true , useCreateIndex : true })