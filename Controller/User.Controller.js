
const User = require('../Models/User.model');

module.exports = {
    createNewUser: async (req,res)=>{

        console.log(req.body);
        try{
            const user = new User(req.body);
            const result = await user.save();
            res.send(result);

        }
        catch(error){
            console.log("Error");
        }
    }
}