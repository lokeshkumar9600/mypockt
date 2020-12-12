const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Mypockt" , {useNewUrlParser : true , useUnifiedTopology:true});
const bodyParser = require('body-parser');
var ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/"+"homepage.html");

});
app.get("/sign-up" , (req,res)=>{
    res.sendFile(__dirname+"/"+"signup-page.html");
    
});

// generation of the account 
app.post("/sign-up" , (req,res)=>{
    main.create({
       firstname : req.body.firstName,
       lastname : req.body.lastName,
       email : req.body.email,
       password : req.body.password
    }, function(err,save){
        if(err){
            console.error(err)
        }else{
            console.log(save)
            res.redirect("/")
        }
    });
   });

// authentication of the account
app.post("/", (req,res)=>{
    let emailx = req.body.email;
    let pass = req.body.password;
    main.findOne({email:emailx},function(err,save){
        if(err){
            console.error(err);
        }else{
            if(save){
                if(save.password === pass){
                    app.get("/main",(req,res)=>{
                        res.render("main")
                    })
                }
                res.redirect("/main")
            }
        }
    })
});

app.post("/main",(req,res)=>{
    let x =  {
        "goal" : req.body.goal,
        "note" : req.body.note,
        "final": req.body.final,
        "initial": req.body.initial
    }
    console.log(x)
    res.redirect("/main")

})
//database section
var accountSchema =  new mongoose.Schema({
    
    goal: String,
    finalAmount:Number,
    InitialAmount:Number,
    Note:String
    
});

var maindb = new mongoose.Schema({
    firstname :String,
    lastname : String,
    email : String,
    password : String,
    Account:[accountSchema]
});
var main = mongoose.model("main",maindb);
var account = mongoose.model("account",accountSchema)

// const one = new account({
//     goal:"ghghhgh",
//     finalAmount:12000,
//     InitialAmount:0,
//     Note:"gjggf"
// })
// one.save()


//end of database section

app.listen(process.env.PORT || port, ()=>{
    console.log("server is running");
});