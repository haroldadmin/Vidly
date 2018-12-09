const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true.name,
        minlength: 5
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().required().trim(),
        email: Joi.string().required(),
        password: Joi.string().min(5).required()
    }
    return Joi.validate(user, schema);
}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validateUser = validateUser;