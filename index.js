const mongoose = require("mongoose");

var express = require('express')

var app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var UserRegister = require('./Routes/User.route');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
console.log("Server Started "+"http://localhost:3000");
});

app.use('/register',UserRegister);

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

app.get('/',(req,res)=>{
  console.log(req.url);
  console.log(req.method);
  res.send("Home Page");

})

mongoose.connect("mongodb://localhost:27017/NewDatabase",
{ 
  useNewUrlParser: true, 
  
}).then(()=> {console.log("Database Connected");})



