const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', routes);

const port = config.server.port || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
