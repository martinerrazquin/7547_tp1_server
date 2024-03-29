'use strict';

var { auth } = require('../middleware');
var { UserController, DriverController } = require('../controllers');

module.exports = (app) => {
  app.route('/drivers/status')
    .put(
      auth.authenticate,
      auth.authorize('driver'),
      UserController.updateDriverStatus
    );

  app.route('/drivers/summary')
    .get(
      auth.authenticate,
      auth.authorize('driver'),
      DriverController.summary
    );

  app.route('/drivers/:driverId/enabled-state')
    .post(
      DriverController.updateEnabledState
    );

  app.route('/drivers')
    .get(
      UserController.listDrivers
    );

  app.route('/drivers/:driverId/images')
    .get(
      DriverController.getImages
    );
};
