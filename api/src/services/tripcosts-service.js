'use strict';

var { TripCost } = require('../models');

var schema = require('./business-constant-schemas').TripCostsSchema;
var BusinessConstantService = require('./business-constant-service');
var MapsService = require('./maps-service');

const PAGE_SIZE = 10;

const calculateTripCost = (tripCostsConstants, tripValues) => {
  var costPerKm = tripCostsConstants.k1 * tripValues.petQuantities.small +
      tripCostsConstants.k2 * tripValues.petQuantities.medium +
      tripCostsConstants.k3 * tripValues.petQuantities.big +
      tripCostsConstants.k4 * tripValues.bringsEscort;
  var multiplier = tripCostsConstants.k5;
  var initialValue = tripCostsConstants.k6;

  var total = costPerKm * tripValues.distance * multiplier + initialValue;

  return total;
};


var TripCostsService = {};

TripCostsService.name = 'TripCostsService';

TripCostsService.retrieve = async() => {
  // find highest createdAt one
  var tripCosts = await TripCost.findAll(
    {limit: 1, order: [['createdAt', 'DESC']]});

  try{
    return tripCosts[0].toJSON();
  }
  catch (e) {
    return null;
  }
};

TripCostsService.newTripCosts = async(newValues) => {

  BusinessConstantService.fitsSchema(newValues,
    schema, 'BadFormat');

  var tripCosts = await TripCost.create(newValues);
  return tripCosts && tripCosts.toJSON ?
    tripCosts.toJSON() : tripCosts;
};

TripCostsService.listAll = async(page = 0) => {
  var tripCosts = await TripCost.findAll({
    offset: page * PAGE_SIZE,
    limit: PAGE_SIZE,
    order: [['createdAt', 'DESC']],
  });
  var tripCostsCount = await TripCost.count();
  return { pageContents: tripCosts, total: tripCostsCount };
};


TripCostsService.calculateCost = async(tripData) => {
  var tripCosts = await TripCostsService.retrieve();


  var directions = await MapsService.
    getDirections([tripData.origin,tripData.destination]);
  try{
    var distance = directions.routes[0].legs[0].distance.value;
    distance = distance / 1000.0; //IMPORTANT: distance was expressed in meters
  } catch (e) {
    distance = null;
  }
  console.log(distance);
  tripData.distance = 10.0; // FIXME

  var cost = calculateTripCost(tripCosts, tripData);
  return cost;
};

module.exports = TripCostsService;
