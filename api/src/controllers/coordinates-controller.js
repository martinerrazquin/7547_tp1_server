'use strict';

var { CoordinatesService } = require('../services');

var CoordinatesController = {};

CoordinatesController.name = 'CoordinatesController';

CoordinatesController.getCoords = async(req, res, next) => {
  if (!req.query.direction || !req.query.direction.trim()){
    return res.status(400).send();
  }
  var xd = await CoordinatesService
    .getCoords(req.query.direction)
    .catch((err) => {
      if (err.name === 'NoResultsFoundOnSearch') {
        res.status(404).json({
          status: 'error',
          type: 'noResults',
        });
        return;
      }
      next(err);
    });
  xd && res.json(xd);
};


module.exports = CoordinatesController;
