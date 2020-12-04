const express = require("express")
const bodyParser = require('body-parser');
var ejs = require('ejs');
var x  = String(Math.floor(Math.random()*101))
console.log(x)

const app = express();
app.set('view engine', 'ejs');
const port = 3000;
arr = [];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/"+"homepage.html");

})






// authentication of the account
app.post("/", (req,res)=>{
    let emailx = req.body.email;
    let pass = req.body.password;
    console.log(emailx,pass)
    for(var i = 0 ; i < arr.length ; i++){
        if(arr[i].email === emailx){
            if(arr[i].password === pass){
                console.log("entry accepted");
                app.get("/main" , (req,res)=>{
                    res.render("main.ejs",{})
                })
                res.redirect("/main");
            }
            else{
               console.log("password wrong")
            }
        }
        else{
        console.log("email wrong ")
        }
        
    } 
});
app.get("/sign-up" , (req,res)=>{
    res.sendFile(__dirname+"/"+"signup-page.html");
    
})
// generation of the account 
app.post("/sign-up" , (req,res)=>{
 let x = { 
    firstname : req.body.firstName,
    lastname : req.body.lastName,
    email : req.body.email,
    password : req.body.password
 };
 console.log("account registered")
 console.log(x)
 arr.push(x)
res.redirect("/");
})
app.listen(process.env.PORT || port, ()=>{
    console.log("server is running");
})