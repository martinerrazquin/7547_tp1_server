'use strict';

var TripCostsService = require('../services/tripcosts-service');

var TripCostsController = {};

TripCostsController.name = 'TripCostsController';

TripCostsController.newTripCosts = async(req, res, next) => {
  if (!req.body){
    return res.status(400).json({
      status: 'error',
      type: 'missingParams',
    });
  }

  try {
    var xd = await TripCostsService.newTripCosts(req.body);
    xd ? res.json(xd) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

TripCostsController.listAll = async(req, res, next) => {
  try {
    var xd = await TripCostsService.listAll(req.query.page);
    xd ? res.json(xd) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

TripCostsController.retrieve = async(req, res, next) => {
  try {
    var xd = await TripCostsService.retrieve();
    xd ? res.json(xd) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

module.exports = TripCostsController;
