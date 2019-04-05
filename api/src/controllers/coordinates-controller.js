'use strict';

var { CoordinatesService } = require('../services');

var CoordinatesController = {};

CoordinatesController.name = 'CoordinatesController';

CoordinatesController.getCoords = async(req, res, next) => {
  if (!req.query.direction || !req.query.direction.trim()){
    return res.status(400).json({
      status: 'error',
      type: 'missingParams',
    });
  }

  try {
    var xd = await CoordinatesService
      .getCoords(req.query.direction);
    xd && res.json(xd);
  } catch (err) {
    if (err.name === 'NoResultsFoundOnSearch') {
      return res.status(404).json({
        status: 'error',
        type: 'noResults',
      });
    }
    next(err);
  }
};


module.exports = CoordinatesController;
