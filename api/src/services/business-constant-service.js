'use strict';

var { BusinessConstant } = require('../models');

var { jsonschema } = require('../config/dependencies');
var schemas = require('./business-constant-schemas');


var BusinessConstantService = {};

BusinessConstantService.name = 'BusinessConstantService';

BusinessConstantService.fitsSchema = (instance, schema, errMsg = null) => {

  var result = jsonschema.validate(instance, schema);
  if (errMsg && !result.valid){
    console.log(result.errors); // DEBUG
    var e = Error();
    e.name = errMsg;
    throw e;
  }

  return result.valid;
};

/*
BusinessConstantService.create = async(bcData) => {
  var businessConstant = await BusinessConstant.create(bcData);
  return businessConstant && businessConstant.toJSON ?
    businessConstant.toJSON() : businessConstant;
};
*/

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
  var businessConstant = await BusinessConstant
    .findOne({where: { name: bcName }});
  return businessConstant && businessConstant.toJSON ?
    businessConstant.toJSON() : businessConstant;
};

BusinessConstantService.updateTripCosts = async(newValues) => {

  BusinessConstantService.fitsSchema(newValues,
    schemas.TripCostsSchema, 'BadFormat');

  return await BusinessConstantService.update('TripCosts',
    {value: newValues});
};

BusinessConstantService.listAll = async() => {
  return await BusinessConstant.findAll();
};

module.exports = BusinessConstantService;
