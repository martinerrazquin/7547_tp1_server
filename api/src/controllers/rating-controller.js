'use strict';

var RatingService = require('../services/rating-service');

var RatingController = {};

RatingController.name = 'RatingController';

RatingController.rateDriver = async(req, res, next) => {
  if (!req.body.rating){
    return res.status(400).json({
      status: 'error',
      type: 'missingParams',
    });
  }

  try {
    var clientId = req.user.id;
    var suggestions = req.body.suggestions ? req.body.suggestions : null;
    var xd = await RatingService.rateDriver(clientId, req.params.tripId,
      req.body.rating, suggestions);
    xd ? res.json(xd) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

RatingController.rateClient = async(req, res, next) => {
  if (!req.body.rating || !req.body.comments){
    return res.status(400).json({
      status: 'error',
      type: 'missingParams',
    });
  }
  try {
    var driverId = req.user.driverData.id;
    var xd = await RatingService.rateClient(driverId, req.params.tripId,
      req.body.rating, req.body.comments);
    xd ? res.json(xd) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};


module.exports = RatingController;
