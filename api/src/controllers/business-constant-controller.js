'use strict';

var BusinessConstantService = require('../services/business-constant-service');

var BusinessConstantController = {};

BusinessConstantController.name = 'BusinessConstantController';

BusinessConstantController.updateTripCosts = async(req, res, next) => {
  if (!req.body.value){
    return res.status(400).json({
      status: 'error',
      type: 'missingParams',
    });
  }

  try {
    var xd = await BusinessConstantService.updateTripCosts(req.body.value);
    xd ? res.json(xd) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

BusinessConstantController.listAll = async(req, res, next) => {
  try {
    var xd = await BusinessConstantService.listAll();
    xd ? res.json(xd) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

BusinessConstantController.getTripCosts = async(req, res, next) => {
  try {
    var xd = await BusinessConstantService.getByName('TripCosts');
    xd ? res.json(xd) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

module.exports = BusinessConstantController;
