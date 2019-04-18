'use strict';

var ErrorHandler = {};

ErrorHandler.name = 'errorHandler';

ErrorHandler.default = (err, req, res, next) => {
  var response = {
    status: 500,
    json: {
      status: 'error',
    },
  };

  if (err.name === 'SequelizeValidationError') {
    response.status = 400;
    response.json.type = 'validationError';
    response.json.validationErrors = [];
    // response.json.raw = err;

    err.errors.forEach((error) => {
      console.log(error.type); // DEBUG
      switch (error.type) {
        case 'notNull Violation':
          response.json.validationErrors.push({
            error: 'isBlank',
            path: error.path,
          });
          break;
        case 'Validation error':
          response.json.validationErrors.push({
            error: error.message,
            path: error.path,
          });
          break;
      }
    });
  } else {
    console.error(err);
  }

  res.status(response.status).json(response.json);
};

module.exports = ErrorHandler;
