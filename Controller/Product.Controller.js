const Product = require('../Models/Product.model');

module.exports = {

    displayContent: (req,res) =>{

        // alert.
        try{
            console.log("df");
            // console.log(window.location.href);
        // document.getElementById('url').innerHTML = "HEY BRIJESH ITS CHANGED";
        // res.render('productpage');

        var full_address = req.protocol + "://" + req.headers.host + req.originalUrl;
        console.log(full_address)

        var id = full_address.substr(-5);
        console.log(id)

        Product.findOne({id: id}).then(productdetails=>{

            if(productdetails){
                console.log(productdetails);

                console.log(productdetails.id + productdetails.CategoryName);

                if(req.body.authenticate==false){
                    res.render('productpage',{id:productdetails.id,CategoryName:productdetails.CategoryName,value:"User Not Signed in"});}
                else{
                      res.render('productpage',{id:productdetails.id,CategoryName:productdetails.CategoryName,value:"User Signed In"});
                    }
                

            }
            else{
                res.send("Product Not Found. Enter ID Correctly");
            }
            

        }).catch((err)=>{
            console.log(err);
        });

        // res.render('productpage',{x:"Hello Brijesh"})



        }
        catch(err){
            console.log("error"+err);
            res.redirect('homepage');
        }

    }



}

