'use strict';

var haversine = require('haversine');

var { schedule } = require('../config/dependencies');

var DriverService = require('./driver-service');
var TripService = require('./trip-service');
var RatingService = require('./rating-service');

var ratingsHelper = require('../helpers/ratings-helper');
var asyncHelper = require('../helpers/async-helper');

var DriverSelectionService = {};

DriverSelectionService.name = 'DriverSelectionService';


var rings = [1, 3, 5, 10, 20, 50, 100];

// calculate distance ring based on euclidean distance to origin
// current distance rings are 1,3,5,10,20,50,100
// IMPORTANT: will return 999 if distance is greater than largest ring
function distanceRingByDistance(driverCurrentLocation, origin) {

  var d1 = {latitude: driverCurrentLocation.lat,
    longitude: driverCurrentLocation.lng};
  var d2 = {latitude: origin.lat, longitude: origin.lng};

  var dist = haversine(d1, d2, {unit: 'km'});

  // keep only rings further than dist, then the minimum of those
  return rings.filter((ring) => { return dist <= ring; })
    .reduce((a, b) => {
      return a < b ? a : b;
    }, 999);

}


// sort criteria: A<B if scoreA>scoreB, if equal then nº of ratings A > nº.r.B
// cmp(A,B) is +1 if A>B, -1 if A<B, 0 if A=B
function comparePossibleDrivers(driver1, driver2){
  var score1 = ratingsHelper.getScore(driver1);
  var score2 = ratingsHelper.getScore(driver2);
  var total1 = ratingsHelper.getNumberOfRatings(driver1);
  var total2 = ratingsHelper.getNumberOfRatings(driver2);

  if (score1 > score2) return -1;
  if (score1 < score2) return 1;
  // same score
  // A>B <=> totalA > totalB
  return total2 - total1;
}


DriverSelectionService.getDriver = async(tripData, exclude = []) => {

  // max distance is 100 km, convert it to degrees of lat and lng
  // rule of thumb is:
  // Latitude: 1 deg = 110.574 km  ===> aprox. 0.009 degrees for 1 km
  // Longitude: 1 deg = 111.320*cos(3.14/180 *latitude) km
  //            ===> aprox. 0.0097 degrees for 1 km

  var max_dist = 100; // in km
  var max_lat_delta = max_dist * 0.00904371733; // 100/110.574
  var max_lng_delta = max_dist * 0.0097;

  // Region = { lat: { max, min }, lng: { max, min } }
  var t = tripData.origin;
  var region = {
    lat: {
      max: t.lat + max_lat_delta,
      min: t.lat - max_lat_delta,
    },
    lng: {
      max: t.lng + max_lng_delta,
      min: t.lng - max_lng_delta,
    },
  };

  var possibleDrivers = await DriverService.getInsideRegion(region, exclude);

  possibleDrivers = possibleDrivers.map((driver) => {
    driver.ring = distanceRingByDistance(driver.currentLocation, t);
    return driver;
  });

  var driverLists = rings.map((xd) => {
    return [];
  }
  ); // empty list for each ring

  possibleDrivers.forEach(
    (driver, idx, array) => {
      var ring = driver.ring; // get ring
      if (ring === 999) return; // dont append if unreachable
      var listIndex = rings.indexOf(ring); // get index of that ring
      driverLists[listIndex].push(driver); // add driver on that index
    }
  );

  driverLists = driverLists.map((driverList) => {
    return driverList.sort(comparePossibleDrivers);
  });

  var drivers = driverLists.reduce((drivers, driverList) => {
    return drivers.concat(driverList);
  }, []); // unzip results

  if (drivers.length === 0) return null;

  // get the first item
  var driver = drivers[0];
  delete driver.ring;
  return driver;
};

DriverSelectionService._buildScheduledJob = (tripId, driverId) => {
  return async() => {
    console.log('executing scheduled job');

    var status = 'En camino';

    var isAvailable = await DriverService.isAvailable(driverId);
    if (!isAvailable) {
      status = 'Cancelado';
    }

    await TripService.update(tripId, { status });
  };
};

DriverSelectionService.startDriverSearch = async(trip) => {
  var exclude = [];
  var driver = await DriverSelectionService.getDriver(trip, exclude);
  var offerStatus = null;
  while (driver && offerStatus !== 'Aceptado') {
    trip.driverId = driver.id;
    trip = await TripService.update(trip.id, trip);
    await DriverService.updateTripOffer(driver.id, trip.id, 'Pendiente');
    var retries = 0;
    while (retries < 8) {
      await asyncHelper.sleep(5000);
      trip = await TripService.getById(trip.id, driver.id);

      offerStatus = trip.drivers[0].DriverTripOffer.status;
      if (offerStatus === 'Aceptado') {
        break;
      } else if (offerStatus === 'Rechazado') {
        retries = 8;
      }

      retries++;
    }

    if (offerStatus === 'Aceptado') {
      break;
    }

    // Reject trip offer and add penalty.
    await DriverService.updateTripOffer(driver.id, trip.id, 'Rechazado');
    if (!trip.reservationDate) {
      await RatingService.addRateToDriver(driver.id, 0);
    }

    exclude.push(driver.id);
    driver = await DriverSelectionService.getDriver(trip, exclude);
  }

  if (offerStatus !== 'Aceptado') { // no driver found
    trip.status = 'Cancelado';
  } else if (!trip.reservationDate) { // driver accepted trip
    trip.status = 'En camino';
  } else { // driver accepted programmed trip
    trip.status = 'Reservado';
    schedule.scheduleJob(
      trip.reservationDate + "-03:00",
      DriverSelectionService._buildScheduledJob(trip.id, driver.id)
    );
  }

  await TripService.update(trip.id, trip);
};


module.exports = DriverSelectionService;
