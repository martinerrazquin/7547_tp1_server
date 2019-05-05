'use strict';

// var { auth } = require('../middleware');
var { BusinessConstantController } = require('../controllers');

module.exports = (app) => {

  app.route('/manage/constants/tripcosts')
    .put(
      BusinessConstantController.updateTripCosts
    );

  app.route('/manage/constants/')
    .get(BusinessConstantController.listAll);
};
