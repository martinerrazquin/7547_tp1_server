'use strict';

module.exports.ErrorHandler = (err) => {
  var response = {
    status: 500,
    json: {},
  };

  if (err.name === 'SequelizeValidationError') {
    response.status = 400;
    response.json.type = 'validationError';
    response.json.validationErrors = [];
    // response.json.raw = err;
    err.errors.forEach((error) => {
      switch (error.type) {
        case 'notNull Violation':
          response.json.validationErrors.push({
            error: 'isBlank',
            path: error.path,
          });
          break;
      }
    });
  }

  return response;
};
