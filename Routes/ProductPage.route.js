var express = require('express')

var router = express.Router();

var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });

app = express()
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

const ProductController = require('../Controller/Product.Controller');


// console.log("Hello");
router.get('/*',ProductController.displayContent);




router.post('/',(req,res)=>{
    console.log("Hello One");
    res.redirect('homepage');
});

module.exports = router;