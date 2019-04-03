'use strict';

var { CoordinatesController } = require('../controllers');

module.exports = (app) => {
  app.route('/coordinates')
    .get(CoordinatesController.getCoords);
};
