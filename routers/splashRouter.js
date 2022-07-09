const express= require('express');
const router= express.Router();
const path= require('path');


router.get('/splashJS.js',(req,res) => { //this is a setup for routes- HTTP requests
    res.sendFile(process.cwd() + "/javascripts/clients/splashJS.js");
});

router.get('/splashScreen.css',(req,res) => {
    res.sendFile(process.cwd() + "/stylesheets/splashScreen.css");
});

router.get('/enterUsername/:userName',(req,res) => { //this is a setup for routes- HTTP requests
    let currentUsername=req.params.userName;
    console.log("User" + currentUsername + " entered their name on the splash screen");
});

router.get("/" , (req,res) => {
    res.redirect('/splash.html');
    console.log("SENT HTML");
} );

module.exports=router;
