'use strict';

// var { auth } = require('../middleware');
var { BusinessConstantController } = require('../controllers');

module.exports = (app) => {

  app.route('/manage/constants/tripcosts')
    .put(BusinessConstantController.updateTripCosts)
    .get(BusinessConstantController.getTripCosts);

  app.route('/manage/constants/')
    .get(BusinessConstantController.listAll);
};
