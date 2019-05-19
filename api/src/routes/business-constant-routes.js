'use strict';

// var { auth } = require('../middleware');
var { TripCostsController } = require('../controllers');

module.exports = (app) => {

  app.route('/manage/constants/tripcosts')
    .post(TripCostsController.newTripCosts)
    .get(TripCostsController.retrieve);

  app.route('/manage/constants/tripcosts/history')
    .get(TripCostsController.listAll);

  app.route('/info/costs')
    .post(TripCostsController.calculateCost);
};
