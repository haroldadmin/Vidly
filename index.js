const Express = require('express');
const Joi = require('joi');
const genres = require('./routes/genres');

const app = Express();
app.use(Express.json());
app.use('/api/genres/', genres);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})