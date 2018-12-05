const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
];

router.get("/", (req, res) => {
    res.send(genres);
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const genre = findGenreById(id, genres);
    if (genre) {
        res.send(genre);
    } else {
        res.status(404).send("Can not find genre with that ID");
    }
})

router.post("/", (req, res) => {
    const genre = req.body;
    const { error } = validateGenre(genre);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else {
        assignIdToGenre(genre, genres);
        genres.push(genre)
        res.send(genre);
    }
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const genre = findGenreById(id, genres);

    if (!genre) {
        res.status(404).send("The requested course can not be found");
        return;
    }

    const updatedGenre = req.body;
    const { error } = validateGenre(updatedGenre);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    } else {
        genre.name = updatedGenre.name;
        res.send(genre);
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const genre = findGenreById(id, genres);

    if (!genre) {
        res.status(404).send("The requested course can not be found");
        return;
    } else {
        genres.splice(genres.indexOf(genre), 1);
        res.send(genre);
        return;
    }

})

function findGenreById(id, genres) {
    return genres.find(element => element.id === parseInt(id));
}

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

function assignIdToGenre(genre, genres) {
    const newId = genres.length + 1;
    genre.id = newId;
}

module.exports = router;