'use strict';

var { auth } = require('../middleware');
var { TripController } = require('../controllers');

module.exports = (app) => {
  app.route('/trips')
    .post(
      auth.authenticate,
      auth.authorize('client'),
      TripController.create)
    .get(TripController.list);

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

  app.route('/trips/:tripId/status/atorigin')
    .put(TripController.updateStatus('En origen'));

  app.route('/trips/:tripId/status/travelling')
    .put(TripController.updateStatus('En viaje'));

  app.route('/trips/:tripId/status/atdestination')
    .put(TripController.updateStatus('Llegamos'));

  app.route('/trips/:tripId/status/finished')
    .put(TripController.updateStatus('Finalizado'));

  app.route('/trips/:tripId/status/cancelled')
    .put(TripController.updateStatus('Cancelado'));

  app.route('/info/route')
    .post(TripController.calculateRoute);
};
