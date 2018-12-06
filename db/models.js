const mongoose = require('mongoose');

const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 55,
        required: true
    }
}));

module.exports.Genre = Genre;
