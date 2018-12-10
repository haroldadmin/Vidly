const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect("mongodb://localhost/vidly")
        .then(() => console.log("Connected to mongoDB"))
        .catch((err) => console.log("Could not connect to mongoDB:", err.message));
}