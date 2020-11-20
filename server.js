const express = require("express")
const app = express();
const port = 3000
app.use(express.static(__dirname+'/public'));
app.get("/home", (req,res)=>{
    res.sendFile(__dirname+"/"+"homepage.html");
})
app.get("/sign-up" , (req,res)=>{
    res.sendFile(__dirname+"/"+"signup-page.html");
})
app.post("/sign-up" , (req,res)=>{
    
})
app.listen(port, ()=>{
    console.log("server is running");
})