
var authenticate = require('./verifytoken.js');

const a = function(){

    if(authenticate()){

        console.log("YAY YOU DID IT");
        
    }
    else{
        console.log("Lots of works");
    }
}

a();