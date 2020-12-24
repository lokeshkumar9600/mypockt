const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Mypockt" , {useNewUrlParser : true , useUnifiedTopology:true});
let  bodyParser = require('body-parser');
var ejs = require('ejs');
const app = express();
let emailx = ""
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
app.get("/error",(req,res)=>{
    res.render("errors",{});
});

app.post("/del",(req,res)=>{
console.log(req.body.del)
})

app.post("/inc",(req,res)=>{
    console.log(req.body.inc);
    console.log(req.body.bt);
    console.log(emailx)
  main.updateOne({"email":emailx,"Account.goal":req.body.bt},{$inc:{"Account.$.InitialAmount":req.body.inc}},(err,save)=>{
      if(err){
          console.log(err)
      }else{
          console.log(save)
          res.redirect("/main")
      }
  });
 
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


app.post("/dec",(req,res)=>{
console.log(req.body.dec);
console.log(req.body.d);
main.updateOne({"email":emailx,"Account.goal":req.body.dec},{$inc:{"Account.$.InitialAmount":-req.body.d}},(err,save)=>{
    if(err){
        console.log(err)
    }else{
        console.log(save)
        res.redirect("/main")
    }
});
})




// authentication of the account
app.post("/", (req,res)=>{
    emailx = req.body.emaildb;
    let pass = req.body.password;
    console.log(emailx,pass)
    main.findOne({email:emailx},function(err,user){
        console.log(user)
        if(err){
            console.error(err);
        }else{
                if(user.password === pass){
                    app.get("/main",(req,res)=>{
                        main.findOne({email:emailx},(err,save)=>{
                            if(err){
                                console.log(err);
                            }else{
                            console.log(save)
                            res.render("main",{save:save})
                            }
                        }); 
                 
                    });
                    res.redirect("/main") 
                }else{
                  app.get("/error" , (req,res)=>{
                      res.render("/error")
                  });
                  res.redirect("/error");
                };       
        };
    });
});

app.post("/main",(req,res)=>{
    let Acc = new account({
        goal:req.body.goal,
        Note:req.body.note,
        finalAmount:req.body.final,
        InitialAmount:req.body.initial

    })
    Acc.save()
    const passwordx = req.body.password;
       main.findOne({email:emailx},function(err,user){
           if(err){
               console.error(err);
           }else{
               if(user.password === passwordx){
                   main.updateOne({password:passwordx},{"$push":{Account:Acc}},function(err,done){
                       if(err){
                           console.error(err)
                       }else{
                           console.log(done);
                           res.redirect("/main")
                       }
                   });
               }
               else{
                   app.get("/error1",(req,res)=>{
                       res.render("error1",{})
                   })
                   res.redirect("/error1")
               }
           }
       })
   

})
//database section
var accountSchema =  new mongoose.Schema({
    
    goal: String,
    Note:String,
    finalAmount:Number,
    InitialAmount:Number
    
    
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

