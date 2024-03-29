'use strict';

var TripCostsService = require('../services/tripcosts-service');

var TripCostsController = {};

TripCostsController.name = 'TripCostsController';

TripCostsController.newTripCosts = async(req, res, next) => {
  try {
    var xd = await TripCostsService.newTripCosts(req.body);
    xd ? res.json(xd) : res.status(500).send();
  } catch (err) {
    next(err);
  }
};

TripCostsController.listAll = async(req, res, next) => {
  try {
    var xd = await TripCostsService.listAll(req.query.page);
    res.json(xd);
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

TripCostsController.calculateCost = async(req, res, next) => {
  try {
    var xd = await TripCostsService.calculateCost(req.body);
    xd ? res.json({cost: xd}) : res.status(500).send();
  } catch (err) {
    next(err);
  }
};

module.exports = TripCostsController;
