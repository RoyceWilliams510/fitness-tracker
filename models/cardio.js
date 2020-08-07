const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CardioSchema = new Schema({
    name: {
        type: Date,
        default: Date.now
    },
    duration:{
        type: Number
    },
    distance:{
        type: Number
    }

});



const Cardio = mongoose.model("Cardio", CardioSchema);

module.exports = Cardio;