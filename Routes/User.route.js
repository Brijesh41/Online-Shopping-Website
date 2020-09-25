var express = require('express')

var router = express.Router();


const UserController = require('../Controller/User.Controller');

router.get('/',(req,res,next)=>{

    res.send("All the users list");
});


router.post('/',UserController.createNewUser);

module.exports = router;