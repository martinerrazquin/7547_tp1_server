'use strict';

var { auth } = require('../middleware');
var { RatingController } = require('../controllers');

module.exports = (app) => {
  app.route('/trips/:tripId/rate/driver')
    .post(
      auth.authenticate,
      auth.authorize('client'),
      RatingController.rateDriver
    );

  app.route('/trips/:tripId/rate/client')
    .post(
      auth.authenticate,
      auth.authorize('driver'),
      RatingController.rateClient
    );
};
