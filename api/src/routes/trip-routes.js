'use strict';

var { TripController } = require('../controllers');

module.exports = (app) => {
  app.route('/trips')
    .post(TripController.create);

  app.route('/trips/simulated')
    .post(TripController.createSimulated);

  app.route('/trips/:tripId')
    .get(TripController.retrieve)
    .put(TripController.update);

  app.route('/trips/:tripId/location')
    .get(TripController.getLocation);
};
