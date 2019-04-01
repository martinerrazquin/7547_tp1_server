'use strict';

var { TripController } = require('../controllers');

module.exports = (app) => {
  app.route('/trips')
    .post(TripController.create);

  app.route('/trips/:tripId')
    .get(TripController.retrieve)
    .put(TripController.update);
};
