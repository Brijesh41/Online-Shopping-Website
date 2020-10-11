const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');

const verify = function(req,res,next){

    try{

    // const token= req.cookie.token;

    console.log("fds");

    console.log(req.body);

    console.log(req.headers.cookie);

    if(!req.headers.cookie){
        req.body.authenticate = false;
        next();
    }
    else{
        var token = req.headers.cookie.substring(6);



        console.log(typeof req.headers.cookie);

        console.log(token);


    
        if(!token){
            req.body.authenticate = false;
            next();}
        else{

            try{
            const verified = jwt.verify(token,process.env.TOKEN_SECRET);

            req.body.authenticate = true;

            console.log(verified);
            next();
            }
            catch(err){
                console.log("Token is invalid or null",err);
                req.body.authenticate = false;
                next();
            }

        }
    }
    }
    catch(err){
        console.log("This is the error",err);
    }
}

module.exports = verify;

