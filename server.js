const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");



const Workout = require("./models/workouts");
const Cardio = require("./models/cardio");
const Resistance = require("./models/resistance");
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
    res.sendfile("./index.html");
})

app.get("/stats",function(req,res){
    res.sendfile("./public/stats.html");
})

app.get("/exercise",function(req,res){
    res.sendfile("./public/exercise.html");
})


app.post("/api/workouts",function(req,res){
    console.log("post hit")
    console.log(req.body);
    Workout.create({
        totalWorkoutDuration:0,
        exercisesPerformed:0,
        weight:0,
        sets:0,
        reps:0,
        distance:0
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(({ message }) => {
        console.log(message);
        res.json(message);
    });
    
})

app.put("/api/workouts/:id",function (req,res){
    console.log("put hit!");
    var exercise = req.body;
    if(req.body.type === "cardio"){
        Cardio.create({
            name: req.body.name,
            distance: req.body.distance,
            duration: req.body.duration
        }).then(dbCardio => {
            res.json(dbCardio);
        }).catch(err => {
            res.json(err);
        });
    }
    if(req.body.type === "resistance"){
        Resistance.create({
            name: req.body.name,
            weight: req.body.weight,
            duration: req.body.duration,
            sets: req.body.sets,
            reps: req.body.reps
        }).then(dbResistance => {
            res.json(dbResistance);
        }).catch(err => {
            res.json(dbResistance);
        });
    }
    console.log(exercise);
    console.log(id);
    // var currentWorkout = Workout.findById({_id: req.params.id});
    // console.log(currentWorkout);
    var id = req.params.id;
    // Workout.findByIdAndUpdate(
    //     {_id:id},
    //     {}
    //     )
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + "http://localhost:" + PORT);
});