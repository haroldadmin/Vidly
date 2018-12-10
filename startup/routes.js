const Express = require('express');
const genresRouter = require('../routes/genres');
const customersRouter = require('../routes/customers');
const moviesRouter = require('../routes/movies');
const rentalsRouter = require('../routes/rentals');
const usersRouter = require('../routes/users');
const authRouter = require('../routes/auth');

module.exports = function (app) {
    app.use(Express.json());
    app.use('/api/genres/', genresRouter);
    app.use('/api/customers/', customersRouter);
    app.use('/api/movies/', moviesRouter);
    app.use('/api/rentals/', rentalsRouter);
    app.use('/api/users/', usersRouter);
    app.use('/api/auth/', authRouter);
}