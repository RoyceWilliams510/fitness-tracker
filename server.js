const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");


const Exercise = require("./models/exerciseModel");
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
    Workout.create({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(({ message }) => {
        console.log(message);
        res.json(message);
    });
    
})

app.put("/api/workouts/:id",function (req,res){
    var id = req.params.id;
    console.log("put hit!");
    console.log(id);
    var exercise = req.body;
    if(req.body.type === "cardio"){
        Exercise.create({
            name: req.body.name,
            type: req.body.type,
            distance: req.body.distance,
            duration: req.body.duration,
            workout: id
        }).then(dbCardio => {
            res.json(dbCardio);
            console.log(dbCardio);
            Workout.findById(id, (err,workout)=>{
                workout.exercises.push(dbCardio);
                workout.save();
            })
        }).catch(err => {
            res.json(err);
        });
    }
    if(req.body.type === "resistance"){
        Exercise.create({
            name: req.body.name,
            type: req.body.type,
            weight: req.body.weight,
            duration: req.body.duration,
            sets: req.body.sets,
            reps: req.body.reps,
            workout: id
        }).then(dbResistance => {
            res.json(dbResistance);
            Workout.findById(id, (err,workout)=>{
                workout.exercises.push(dbResistance);
                workout.save();
            })
        }).catch(err => {
            res.json(dbResistance);
        });
    }
    
    // var currentWorkout = Workout.findById({_id: req.params.id});
    // console.log(currentWorkout);
    // Workout.findByIdAndUpdate(
    //     {_id:id},
    //     {}
    //     )
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + "http://localhost:" + PORT);
});