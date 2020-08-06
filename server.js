const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");



const PORT = process.env.PORT || 8080;
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Requiring our models for syncing
// var db = require("./models"); // used in router
app.use(logger("dev"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker", { useNewUrlParser: true });



app.get("/",function(req,res){
    res.sendFile("./index.html");
})

app.get("/stats",function(req,res){
    res.sendFile("./public/stats.html");
})

app.get("/exercise",function(req,res){
    res.sendFile("./public/exercise.html");
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + "http://localhost:" + PORT);
});