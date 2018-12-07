const app = require('express');
const router = app.Router();
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get("/", async (req, res) => {
    const movies = await Movie.find().sort({ name: 1 });
    res.send(movies);
})

router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.send(movie);
            return;
        } else {
            res.status(404).send("A movie with that ID could not be found");
            return;
        }
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid ID");
    }
})

router.post("/", async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    let genre;
    try {
        genre = await Genre.findById(req.body.genreId);
        if (!genre) {
            res.status(404).send("A genre with the given ID could not be found");
            return;
        }
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid genre ID");
        return;
    }

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    const result = await movie.save();
    res.send(result);
})

router.put("/:id", async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
        res.status(400).send("Invalid genre");
        return;
    }

    try {
        const result = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });
        if (!result) {
            res.status(404).send("A Movie with the requested ID could not be found");
            return;
        }
        res.send(result);
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid ID");
        return;
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const result = await Movie.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).send("A movie with the requested ID could not be found");
            return;
        }
        res.send(result);
    } catch (ex) {
        if (ex.name === "CastError") {
            res.status(400).send("Invalid ID");
        }
    }
})

module.exports = router;