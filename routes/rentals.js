const app = require('express');
const router = app.Router();
const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

router.get("/", async (req, res) => {
    const rentals = await Rental.find();
    res.send(rentals);
})

router.get("/:id", async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) { return res.status(404).send("A Rental with the requested ID could not be found"); }
        res.send(rental);
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid ID");
        return;
    }
})

router.post("/", async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) { return res.status(400).send(error.details[0].message); }

    let movie;
    try {
        movie = await Movie.findById(req.body.movieId);
        if (!movie) { return res.status(404).send("A movie with the requested ID could not be found"); }
        if (movie.numberInStock == 0) return res.status(400).send("Movie not in stock");
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid movie ID");
        else console.log(ex);
        return;
    }

    let customer;
    try {
        customer = await Customer.findById(req.body.customerId);
        if (!customer) { return res.status(404).send("A customer with the requested ID could not be found"); }
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid customer ID");
        else console.log(ex);
        return;
    }

    const rental = new Rental({
        movie: {
            _id: movie._id,
            title: movie.title
        },
        customer: {
            _id: customer._id,
            name: customer.name
        }
    });
    try {
        const result = await rental.save();
        movie.numberInStock -= 1;
        await movie.save();
        res.send(result);
    } catch (ex) {
        res.status(500);
        console.log(ex);
    }
})

router.put("/:id", async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) { return res.status(400).send(error.details[0].message); }
    let movie;
    try {
        movie = await Movie.findById(req.body.movieId);
        if (!movie) { return res.status(404).send("A movie with the requested ID could not be found."); }
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid Movie ID");
        return;
    }
    let customer;
    try {
        customer = await Customer.findById(req.body.customerId);
        if (!customer) { return res.status(404).send("A customer with the requested ID could not be found"); }
    } catch (ex) {
        return res.status(400).send("Invalid customer ID"); }
    try {
        const rental = await Rental.findByIdAndUpdate(req.params.id, {
            movie: {
                _id: movie._id,
                title: movie.title
            },
            customer: {
                _id: customer._id,
                name: customer.name
            }
        }, { new: true });
        if (!rental) { return res.status(404).send("A rental with the requested ID could not be found.") }
        res.send(rental);
        return;
    } catch (ex) {
        res.status(400).send("Invalid rental ID");
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const result = await Rental.findByIdAndDelete(req.params.id);
        if (!result) { return res.status(404).send("A rental with the requestd ID could not be found."); }
        res.send(result);
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid ID");
    }
})

module.exports = router;