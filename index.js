const Express = require('express');
const app = Express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})