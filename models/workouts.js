const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    totalWorkoutDuration:{
        type: Number
    },
    exercisesPerformed:{
        type: Number
    },
    weight:{
        type: Number

    },
    sets:{
        type: Number
    },
    reps:{
        type: Number
    },
    distance:{
        type: Number
    }



});



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
