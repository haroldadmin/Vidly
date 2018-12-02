const Express = require('express');
const Joi = require('joi');

const app = Express();
app.use(Express.json());
const port = process.env.PORT || 3000;

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];

app.get("/api/genres/", (req, res) => {
    res.send(genres);
})

app.get("/api/genres/:id", (req, res) => {
    const id = req.params.id;
    const genre = findGenreById(id, genres);
    if (genre) {
        res.send(genre);
    } else {
        res.status(404).send("Can not find genre with that ID");
    }
})

function findGenreById(id, genres) {
    return genres.find(element => element.id === parseInt(id));
}

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})