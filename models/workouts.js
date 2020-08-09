const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    // totalWorkoutDuration:{
    //     type: Number
    // },
    // exercisesPerformed:{
    //     type: Number
    // },
    // weight:{
    //     type: Number

    // },
    // sets:{
    //     type: Number
    // },
    // reps:{
    //     type: Number
    // },
    // distance:{
    //     type: Number
    // },
    // resistance: [{
    //     type: Schema.Types.ObjectId, 
    //     ref : "Resistance"
    // }],
    // cardio: [{
    //     type: Schema.Types.ObjectId, 
    //     ref : "Cardio"
    // }]
    exercises:[{
        type: Schema.Types.ObjectId,
        ref : "Exercise"
    }]
});



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
