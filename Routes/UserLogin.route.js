var express = require('express')

var router = express.Router();

var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });

app = express()
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

const UserController = require('../Controller/User.Controller');

router.get('/',(req,res,next)=>{
    res.render('loginpage');
});




router.post('/',UserController.LoginUser);

module.exports = router;