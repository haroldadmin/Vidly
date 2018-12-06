const mongoose = require('mongoose');

const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 55,
        required: true
    }
}));

const Customer = mongoose.model("Customer", new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
}))

module.exports.Genre = Genre;
module.exports.Customer = Customer;
