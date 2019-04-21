'use strict';

var { express, logger } = require('./config/dependencies');
var { errorHandler, auth } = require('./middleware');
var app = express();

app.use(logger('dev'));
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(auth.authenticate);

require('./routes')(app);

app.use(errorHandler.default);

module.exports = app;
