const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: false
    },
    exercises:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Exercise'
    }]
});

module.exports = mongoose.model('Workouts', schema);