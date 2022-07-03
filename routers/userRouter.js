const express= require('express');
const router= express.Router();

let testName= "";

router.get("/createNewUser/:userName", (req, res) => {
    testName=req.params.userName; //you need to use .params to user variable from endpoint itself
    res.render( "splash" ,{message : testName});
    console.log(testName);
});

module.exports= router;