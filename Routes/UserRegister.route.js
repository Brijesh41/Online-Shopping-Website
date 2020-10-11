var express = require('express')

var router = express.Router();

var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });

app = express()
var authenticate = require('../verifytoken');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

const UserController = require('../Controller/User.Controller');

router.get('/',authenticate,(req,res,next)=>{

    if(req.body.authenticate==false){
    res.render('registrationpage',{value:"User Not Signed In"});}
    else{
        res.render('registrationpage',{value:"User Logged in"});}
    
});




router.post('/',authenticate,UserController.createNewUser);

module.exports = router;