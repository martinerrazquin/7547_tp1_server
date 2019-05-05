'use strict';

var { auth } = require('../middleware');
var { RatingController } = require('../controllers');

module.exports = (app) => {
  app.route('/trips/:tripId/rate/driver')
    .post(
      auth.facebookAuthenticate,
      auth.authorize('client'),
      RatingController.rateDriver
    );
};
