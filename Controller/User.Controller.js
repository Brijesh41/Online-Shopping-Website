
const User = require('../Models/User.model');

module.exports = {
    createNewUser: async (req,res)=>{

        // Validation of Passwords goes here or any other validations
        console.log(req.body);
        try{
            const user = new User(req.body);
            const result = await user.save();
            // res.send(result);
            res.render('homepage');

        }
        catch(error){
            console.log("Error");
        }

    
    }
}