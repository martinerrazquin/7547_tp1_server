'use strict';

var { Driver } = require('../models');

var DriverService = require('./driver-service');
var TripService = require('./trip-service');

var RatingService = {};

RatingService.name = 'RatingService';

RatingService.addRateToDriver = async(driverId, value, suggestions) => {
  var driver = await Driver.findByPk(driverId);
  driver = driver && driver.toJSON ? driver.toJSON() : driver;

  var k = '';
  switch (value) {
    case 0:
      k = 'rejections'; break;
    case 1:
      k = 'one'; break;
    case 2:
      k = 'two'; break;
    case 3:
      k = 'three'; break;
    case 4:
      k = 'four'; break;
    case 5:
      k = 'five'; break;
  }
  driver.ratings[k] += 1;

  if (value > 0 && value <= 3){
    ['app', 'vehicle', 'driver'].forEach(
      (k) => {
        if (!Object.keys(suggestions).includes(k)){
          var e = Error();
          e.name = 'RatingsFormatNotMet';
          throw e;
        }
        if (suggestions[k]){
          driver.suggestions[k] += 1;
        }
      }
    );
  }
  return await DriverService.update(driverId, driver);
};

RatingService.rateDriver = async(tripId, rating, suggestions) => {

  if (![1, 2, 3, 4, 5].includes(rating) || (rating <= 3 && !suggestions)){
    var e = Error();
    e.name = 'RatingsFormatNotMet';
    throw e;
  }
  // prepare trip data for update
  var trip = await TripService.getById(tripId);

  if (trip.driverRating && trip.driverRating.rating !== 0){
    e = Error();
    e.name = 'DriverAlreadyRated';
    throw e;
  }
  trip.driverRating = {};
  trip.driverRating.rating = rating;
  if (rating <= 3){
    trip.driverRating.suggestions = suggestions;
  }

  // update driver
  var driverId = trip.driverId;
  await RatingService.addRateToDriver(driverId, rating, suggestions);

  // update trip
  var res = await TripService.update(tripId, trip);
  return res;
};

RatingService.rateClient = async(tripId, rating, comments) => {

  if (![1, 2, 3, 4, 5].includes(rating)){
    var e = Error();
    e.name = 'RatingsFormatNotMet';
    throw e;
  }
  var trip = await TripService.getById(tripId);

  if (trip.clientRating && trip.clientRating.rating !== 0){
    e = Error();
    e.name = 'ClientAlreadyRated';
    throw e;
  }
  trip.clientRating = {};
  trip.clientRating.rating = rating;
  trip.clientRating.comments = comments;

  var res = await TripService.update(tripId, trip);
  return res;
};

module.exports = RatingService;
