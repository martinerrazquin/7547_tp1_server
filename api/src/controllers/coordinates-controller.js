'use strict';

//TODO
//var { CoordinatesService } = require('../services');

var CoordinatesController = {};

CoordinatesController.name = 'CoordinatesController';

CoordinatesController.get_coords =
    //TODO
    (req, res) => {
      res.json({
        lat: -34.5311936,
        lng: -58.54854270000001,
        formatted_address: "Rafael Obligado 6692, B1606AOP Villa Adelina, Buenos Aires, Argentina"
      });
    };


module.exports = CoordinatesController;