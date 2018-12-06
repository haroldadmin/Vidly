const Express = require('express');
const Joi = require('joi');
const genresRouter = require('./routes/genres');
const mongoose = require('mongoose');

const app = Express();
app.use(Express.json());
app.use('/api/genres/', genresRouter);

const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.log("Could not connect to mongoDB:", err.message));

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})