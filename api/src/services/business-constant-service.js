'use strict';

var { BusinessConstant } = require('../models');

var BusinessConstantService = {};

BusinessConstantService.name = 'BusinessConstantService';

BusinessConstantService.create = async(bcData) => {
  var businessConstant = await BusinessConstant.create(bcData);
  return businessConstant && businessConstant.toJSON ?
      businessConstant.toJSON() : businessConstant;
};

BusinessConstantService.update = async(bcName, bcData) => {
  var updated = await BusinessConstant.update(bcData, {
    returning: true,
    where: { name: bcName },
  });

  if (updated.length === 1) {
    return null;
  } else {
    var businessConstant = updated[1][0];
    return businessConstant.toJSON ?
        businessConstant.toJSON() : businessConstant;
  }
};

BusinessConstantService.getByName = async(bcName) => {
  var businessConstant = await BusinessConstant.
    findOne({where: { name: bcName }});
  return businessConstant && businessConstant.toJSON ?
      businessConstant.toJSON() : businessConstant;
};

BusinessConstantService.updateTripCosts = async(newValues) => {
  ['k1','k2','k3','k4','k5','k6'].forEach(
      (constant) => {
        if(newValues[constant]<0){
          var e = Error();
          e.name = 'TripCostsConstantIsNegative';
          throw e;
        }
      }
  );
  console.log(newValues);//DEBUG
  return await BusinessConstantService.update('TripCosts', {value: newValues});
};

BusinessConstantService.listAll = async ()=> {
  return await BusinessConstant.findAll();
};

module.exports = BusinessConstantService;
