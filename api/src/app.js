'use strict';

var { express, logger } = require('./config/dependencies');
var { errorHandler } = require('./middleware');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

app.use(errorHandler.default);

module.exports = app;
