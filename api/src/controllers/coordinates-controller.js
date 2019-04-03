'use strict';

var { CoordinatesService } = require('../services');

var CoordinatesController = {};

CoordinatesController.name = 'CoordinatesController';

CoordinatesController.getCoords =
    async(req, res, next) => {
      if (!req.query.direction || !req.query.direction.trim()){
        res.status(400).send();
        return;
      }
      var xd = await CoordinatesService
        .getCoords(req.query.direction)
        .catch((err) => next(err));
      res.json(xd);
    };


module.exports = CoordinatesController;
