'use strict';

var { UserController } = require('../controllers');

module.exports = (app) => {
  app.route('/drivers/status')
    .put(UserController.updateDriverStatus);
};
