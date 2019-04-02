'use strict';

// TODO
// var { CoordinatesService } = require('../services');

var CoordinatesController = {};

CoordinatesController.name = 'CoordinatesController';

CoordinatesController.get_coords =
    // TODO
    (req, res) => {
      if (!req.body.direction || !req.body.direction.trim()){
        res.status(400).send();
        return;
      }
      res.json({
        lat: -34.5311936,
        lng: -58.54854270000001,
        formatted_address: 'Rafael Obligado 6692, ' +
            'B1606AOP Villa Adelina, Buenos Aires, Argentina',
      });
    };


module.exports = CoordinatesController;
