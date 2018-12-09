const mongoose = require('mongoose');
const Joi = require('joi');
const { movieSchema } = require('../models/movie');
const { customerSchema } = require('../models/customer');

const rentalSchema = new mongoose.Schema({
    movie: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        }
    },
    customer: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    dateOut: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateIn: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        movieId: Joi.string().required(),
        customerId: Joi.string().required(),
    }
    return Joi.validate(rental, schema);
}

module.exports.rentalSchema = rentalSchema;
module.exports.Rental = Rental,
    module.exports.validateRental = validateRental;