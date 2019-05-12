'use strict';

var { TripCost } = require('../models');

var schema = require('./business-constant-schemas').TripCostsSchema;
var BusinessConstantService = require('./business-constant-service');

const PAGE_SIZE = 10;

var TripCostsService = {};

TripCostsService.name = 'TripCostsService';

TripCostsService.retrieve = async() => {
  // find highest createdAt one
  var tripCosts = await TripCost.findAll(
    {limit: 1, order: [['createdAt', 'DESC']]});

  return tripCosts && tripCosts.toJSON ?
    tripCosts.toJSON() : tripCosts;
};

TripCostsService.newTripCosts = async(newValues) => {

  BusinessConstantService.fitsSchema(newValues,
    schema, 'BadFormat');

  var tripCosts = await TripCost.create(newValues);
  return tripCosts && tripCosts.toJSON ?
    tripCosts.toJSON() : tripCosts;
};

TripCostsService.listAll = async(page = 0) => {
  return await TripCost.findAll({
    offset: page * PAGE_SIZE,
    limit: PAGE_SIZE,
    order: [['createdAt', 'DESC']],
  });
};

module.exports = TripCostsService;