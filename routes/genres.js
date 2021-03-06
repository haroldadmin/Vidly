const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validateGenre } = require('../models/genre');
const router = express.Router();

router.get("/", async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const genre = await Genre.findById(id)
        if (genre) {
            res.send(genre);
        } else {
            res.status(404).send("Can not find genre with that ID");
        }
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid ID")
    }
})

router.post("/", auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else {
        const genre = new Genre({ name: req.body.name });
        const result = await genre.save();
        res.send(result);
    }
})

router.put("/:id", auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!genre) {
            res.status(404).send("The requested course can not be found");
        } else {
            res.send(genre);
        }
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid ID")
    }
})

router.delete("/:id", [auth, admin], async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id)
        if (!genre) {
            res.status(404).send("The requested course can not be found");
        } else {
            res.send(genre);
        }
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid ID");
    }
})

module.exports = router;