const express= require('express');
const router= express.Router();
const gameMap= new Map();
const userMap= new Map();
let currentPlayerId=0;
let currentUser=0;
const boardCalculator= require('../javascripts/server/boardStateCalculator.js');

router.get("/" , (req,res) => {
    res.redirect("../splash");
} );

router.get("/enterNewGame/:userName" , (req,res) => {
    res.redirect("/tetrisBoard.html");
    currentUser=req.params.userName;
    console.log("SENT HTML");
    console.log("Created New Game For Player " + req.params.userName);
} );

router.get("/tetrisClient.js" , (req,res) => {
    res.sendFile('C:\\Users\\vdako\\WebstormProjects\\memorygame\\javascripts\\clients\\tetrisClient.js');
    console.log("SENT JS");
} );

router.get("/getPlayerId", (req,res) => {
    res.send({ id: currentPlayerId });


    userMap.set(currentPlayerId,currentUser);
    gameMap.set(currentPlayerId,boardCalculator());


    console.log("SENT PLAYER ID " + currentPlayerId);
    currentPlayerId++;
});

router.get("/:playerId/getPlayerName", (req,res) => {
    let name=userMap.get(parseInt(req.params.playerId));
    res.send({player: name});
    console.log("SENT PLAYER USERNAME " + name + " FOR ID " + req.params.playerId);
});


router.get("/tetrisCSS.css" , (req,res) => {
    res.sendFile('C:\\Users\\vdako\\WebstormProjects\\memorygame\\stylesheets\\tetrisCSS.css');
    console.log("SENT CSS");
} );

router.get("/:playerId/newBoard" , (req,res) => {

    let currentPlayerId= parseInt(req.params.playerId);
    if(gameMap.get(currentPlayerId)==null){
        res.redirect("../splash");
    }

    gameMap.get(currentPlayerId).nextBoardState();
    res.send(gameMap.get(currentPlayerId));
} );

router.get("/:playerId/right" , (req,res) => {

    let currentPlayerId= parseInt(req.params.playerId);
    if(gameMap.get(currentPlayerId)==null){
        res.redirect("../splash");
    }

    gameMap.get(currentPlayerId).moveRight();
    res.send(gameMap.get(currentPlayerId));
} );

router.get("/:playerId/left" , (req,res) => {

    let currentPlayerId= parseInt(req.params.playerId);
    if(gameMap.get(currentPlayerId)==null){
        res.redirect("../splash");
    }

    gameMap.get(currentPlayerId).moveLeft();
    res.send(gameMap.get(currentPlayerId));
} );

router.get("/:playerId/rotate" , (req,res) => {

    let currentPlayerId= parseInt(req.params.playerId);
    if(gameMap.get(currentPlayerId)==null){
        res.redirect("../splash");
    }

    gameMap.get(currentPlayerId).rotate();
    res.send(gameMap.get(currentPlayerId));
} );


router.get("/:playerId/down" , (req,res) => {

    let currentPlayerId= parseInt(req.params.playerId);
    if(gameMap.get(currentPlayerId)==null){
        res.redirect("../splash");
    }

    gameMap.get(currentPlayerId).down();
    res.send(gameMap.get(currentPlayerId));
} );

router.get("/:playerId/space" , (req,res) => {

    let currentPlayerId= parseInt(req.params.playerId);
    if(gameMap.get(currentPlayerId)==null){
        res.redirect("../splash");
    }

    gameMap.get(currentPlayerId).space();
    res.send(gameMap.get(currentPlayerId));
} );

module.exports= router;

