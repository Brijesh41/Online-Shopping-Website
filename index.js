const mongoose = require("mongoose");

var express = require('express')

var app = express()

var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



var cookie = require('cookie-parser');
app.use(cookie());

require("dotenv").config();

var UserRegister = require('./Routes/UserRegister.route');

var UserLogin = require('./Routes/UserLogin.route');

var ProductPage = require('./Routes/ProductPage.route');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
console.log("Server Started "+"http://localhost:3000");
});

// Register Page Complete. Only field types to be changed as well as there validations are required
var authenticate = require('./verifytoken');

app.use('/register',authenticate,UserRegister);

app.use('/login',authenticate,UserLogin);

app.use('/productpage',ProductPage);

app.get('/',authenticate,(req,res)=>{
  console.log("authenticate",req.body.authenticate,typeof authenticate);
  if(req.body.authenticate==false){
  res.render('homepage',{value:"User Not Signed in"});}
  else{
    res.render('homepage',{value:"User Signed In"});
  }
});
app.get('/homepage',authenticate,(req,res)=>{
  console.log("authenticate",req.body.authenticate,typeof authenticate);
  if(req.body.authenticate==false){
  res.render('homepage',{value:"User Not Signed in"});}
  else{
    res.render('homepage',{value:"User Signed In"});
  }
});


app.use('/',(req,res,next)=>{

  const err = new Error('Page Not Assigned Yet!');
  err.status = 404;
  next(err); 

});
app.use((err,req,res,next)=>{
  res.status(err.status);
  res.send({
    error:{
      status: err.status || 500,
      message: err.message
    }
  });

});


// Create Your own Database Change name here. If you wish or we could use an online cluster.

mongoose.connect("mongodb://localhost:27017/NewDatabase",
{ 
  useNewUrlParser: true, 
  
}).then(()=> {console.log("Database Connected");})



