const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        name: String,
        age: Number,
        weight: Number,
        height: Number
    }
});

module.exports = mongoose.model('User', schema);