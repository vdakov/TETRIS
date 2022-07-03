console.log("Hello World ");



const express= require('express');


app=express();
app.use(express.static("public"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const gameRouter= require("./routers/gameRouter");
const userRouter= require("./routers/userRouter");
const splashRouter=require("./routers/splashRouter")
app.use("/game", gameRouter); //anything that starts with /game will be routed to this
app.use("/user", userRouter);
app.use("/splash", splashRouter);

app.get('/',(req,res) => { //this is a setup for routes- HTTP requests
    res.redirect('/splash');
    console.log("Redirected to splash!");
});




const PORT=8080;

app.listen(PORT, () => {
    console.log( "Listening on port " + PORT + "...");
});
