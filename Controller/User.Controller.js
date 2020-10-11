
const User = require('../Models/User.model');

const bcrypt = require('bcryptjs');

const jwt  = require('jsonwebtoken');

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');

dotenv.config();


module.exports = {

    LoginUser: async (req,res) =>{

        console.log(req.body);

        const email = req.body.email;
        const password  = req.body.password;

        
        console.log(email);

        User.findOne({email}).then(user =>{
            if(!user){
                console.log("User Not Found");

                res.redirect('/login');
            }
            else{
                bcrypt.compare(password,user.password).then(isMatch =>{
                    if(isMatch){
                        console.log("User Found");

                        console.log(process.env.TOKEN_SECRET);


                        const token = jwt.sign({_id:user._id},""+process.env.TOKEN_SECRET);

                        // res.header('auth_token',token).send(token);

                        res.cookie('token', token, { httpOnly: true });






                        res.redirect('/homepage');
                    }
                    else{
                        console.log("Wrong Password Enter");
                        res.redirect('/login');
                    }
                }).catch((err)=>{
                    console.log("error thrown",err);
                });
            }

            

        });


        // res.redirect('/homepage');



    },

    createNewUser: async (req,res)=>{

        // Validation of Passwords goes here or any other validations
        console.log(req.body);
        try{
            const {name,username,email,password,password2,phoneNumber} = req.body;

            let errors = [];

            if (!name || !email || !password || !password2) {
                errors.push({ msg: 'Please enter all fields' });
              }
            
              if (password != password2) {
                errors.push({ msg: 'Passwords do not match' });
              }
            
              if (password.length < 6) {
                errors.push({ msg: 'Password must be at least 6 characters' });
              }
            
            //   if (errors.length > 0) {
            //       console.log(errors);
            //     res.render('/register', {
            //       name,
            //       email,
            //       password,
            //       password2
            //     });
            //   }

            //use the above if Case to render by sending json body while rendering
            
                 
                const founduser = await User.findOne({email:req.body.email});
            
                console.log(founduser);

                let encpassword;

                if(founduser){
            
                    console.log("User already exists");
                    
                    res.redirect('/register');

                }
                else{
                    const user = new User(req.body);
                    
        
                    const rounds = 10;
                    const password = user.password;
                    bcrypt.genSalt(rounds, function(err, salt) {
                        bcrypt.hash(user.password, salt, function(err, hash) {
                            // Store hash in your password DB.
                            user.password = hash;
                            user.save().then(item => {
                                // res.send("item saved to database");
                                console.log("Saved ");
                                res.redirect('/login');
                                })
                                .catch(err => {
                                res.redirect('/register')
                                });;
                            
                        });
                    })
                    
                    // console.log("A"+user.password+"a"+a);
                    // user.password = a;
                    // const result = await 
                    // res.redirect('/login');

                    

                }
            
            
        }
        catch(error){
            // if (err.status >= 100 && err.status < 600)
            // res.status(err.status);
            console.log(error);
            console.log("Error found");
            res.render('register');

        }

    
    }
}