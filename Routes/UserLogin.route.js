var express = require('express')

var router = express.Router();

var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });

app = express()
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var authenticate = require('../verifytoken');

const UserController = require('../Controller/User.Controller');

router.get('/',authenticate,(req,res,next)=>{
    if(req.body.authenticate==false){
        res.render('loginpage',{value:"User Not Signed In"});}
    else{
        res.render('loginpage',{value:"User Logged in"});}
});




router.post('/',authenticate,UserController.LoginUser);

module.exports = router;