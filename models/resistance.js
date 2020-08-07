const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResistanceSchema = new Schema({
    name: {
        type: String
    },
    duration:{
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
    }

});



const Resistance = mongoose.model("Resistance", ResistanceSchema);

module.exports = Resistance;