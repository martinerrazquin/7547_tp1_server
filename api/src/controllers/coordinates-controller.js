'use strict';

var { CoordinatesService } = require('../services');

var CoordinatesController = {};

CoordinatesController.name = 'CoordinatesController';

CoordinatesController.get_coords =
    async(req, res, next) => {
      if (!req.query.direction || !req.query.direction.trim()){
        res.status(400).send();
        return;
      }
      console.log(req.query.direction);
      var xd = await CoordinatesService
        .get_coords(req.query.direction)
        .catch((err) => next(err));

      console.log(xd);
      res.json(xd);
    };


module.exports = CoordinatesController;
