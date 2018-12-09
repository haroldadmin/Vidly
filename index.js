// Network imports
const Express = require('express');
const genresRouter = require('./routes/genres');
const customersRouter = require('./routes/customers');
const moviesRouter = require('./routes/movies');
const rentalsRouter = require('./routes/rentals');

// Database imports
const mongoose = require('mongoose');

const app = Express();
app.use(Express.json());
app.use('/api/genres/', genresRouter);
app.use('/api/customers/', customersRouter);
app.use('/api/movies/', moviesRouter);
app.use('/api/rentals/', rentalsRouter);

// Database connection
mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.log("Could not connect to mongoDB:", err.message));

// Network connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})