'use strict';

var { express, logger } = require('./config/dependencies');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

module.exports = app;
