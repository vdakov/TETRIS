const express= require('express');
const PORT=8080;
app=express();
app.use(express.static("public"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/*
    Routers
 */
const gameRouter= require("./routers/gameRouter");
const userRouter= require("./routers/userRouter");
const splashRouter=require("./routers/splashRouter")
app.use("/game", gameRouter);
app.use("/user", userRouter);
app.use("/splash", splashRouter);

/*
    Redirects the client directly to the splash screen
 */
app.get('/',(req,res) => {
    res.redirect('/splash');
    console.log("Redirected to splash!");
});


app.listen(PORT, () => {
    console.log( "Listening on port " + PORT + "...");
});
