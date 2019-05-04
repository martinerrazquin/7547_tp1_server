'use strict';

var { auth } = require('../middleware');
var { UserController } = require('../controllers');

module.exports = (app) => {
  app.route('/drivers/status')
    .put(
      auth.facebookAuthenticate,
      auth.authorize('driver'),
      UserController.updateDriverStatus
    );
};
