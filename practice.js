
// const bcrypt = require('bcryptjs')
// let password = 'brijesh';
// var rounds = 10;

// var a = function(){
//     var pass = bcrypt.hash(password, rounds, (err, hash) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     // console.log('pass',user.password);
//     // a = hash;
//     console.log('hash',hash);

//     return hash;
//   });
//   console.log("pass",pass);
//   return pass;
// }
// console.log("return "+a());

 var User = require('./Models/User.model')

 req = {
  "name": "csfv",
  "username": "fejhk",
  "email": "vscb@gmai.com",
  "password": "dkb",
  "password2": "dkb",
  "phoneNumber": "312"
}
 const newu = User(req);


var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newu.password, salt, function(err, hash) {
        // Store hash in your password DB.

        console.log(hash);
    });
})
