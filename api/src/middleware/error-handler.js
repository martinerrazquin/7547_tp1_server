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
    response.json.errors = [];
    // response.json.raw = err;

    err.errors.forEach((error) => {
      switch (error.type) {
        case 'notNull Violation':
          response.json.errors.push({
            error: 'isBlank',
            path: error.path,
          });
          break;
        case 'Validation error':
          response.json.errors.push({
            error: error.message,
            path: error.path,
          });
          break;
        default:
          console.log(error);
          break;
      }
    });
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    response.status = 403;
    response.json.type = 'constraintError';
    response.json.errors = [];
    // response.json.raw = err;

    err.errors.forEach((error) => {
      switch (error.type) {
        case 'unique violation':
          response.json.errors.push({
            error: 'alreadyExists',
            path: error.path,
          });
          break;
        default:
          console.log(error);
          break;
      }
    });
  } else if (err.name === 'InternalOAuthError') {
    return res.status(401).send('Session expired');
  } else if (err.name === 'RatingsFormatNotMet'){
    return res.status(400).send('Bad Format');
  } else if (err.name === 'DriverAlreadyRated' ||
             err.name === 'ClientAlreadyRated'){
    return res.status(403).send('Trip already rated');
  } else if (err.name === 'WrongUserId'){
    return res.status(403).send('Trip is not own');
  } else if (err.name === 'TripCostsConstantIsNegative'){
    return res.status(400).send('A trip cost constant is negative');
  } else {
    console.error('ERROR: Don\'t know how to handle: ');
    console.error(err);
  }

  res.status(response.status).json(response.json);
};

module.exports = ErrorHandler;
