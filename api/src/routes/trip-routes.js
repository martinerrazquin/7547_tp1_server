'use strict';

var { auth } = require('../middleware');
var { TripController } = require('../controllers');

module.exports = (app) => {
  app.route('/trips')
    .post(
      auth.authenticate,
      auth.authorize('client'),
      TripController.create
    );

  app.route('/trips/simulated')
    .post(
      auth.authenticate,
      auth.authorize('client'),
      TripController.createSimulated
    );

  app.route('/trips/:tripId')
    .get(TripController.retrieve)
    .put(TripController.update);

  app.route('/trips/:tripId/location')
    .get(TripController.getLocation);
};
