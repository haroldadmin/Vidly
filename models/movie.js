const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('../models/genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        maxLength: 255,
        trim: true,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(2).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    return Joi.validate(movie, schema);
}

module.exports.movieSchema = movieSchema;
module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;