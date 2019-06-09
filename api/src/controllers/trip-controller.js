'use strict';

var {
  TripService,
  SimulationService,
  DriverSelectionService,
  MapsService,
  DriverService,
} = require('../services');

var { moment } = require('../config/dependencies');

var TripController = {};

TripController.name = 'TripController';

TripController.create = async(req, res, next) => {
  try {
    req.body.clientId = req.user.id;

    // model won't allow null ids so it's fine
    var trip = await TripService.create(req.body);
    DriverSelectionService.startDriverSearch(trip);

    trip ? res.json(trip) : res.status(500).send();
  } catch (err) {
    next(err);
  }
};

TripController.createSimulated = async(req, res, next) => {
  try {
    req.body.clientId = req.user.id;
    var trip = await SimulationService.createSimulatedTrip(req.body);
    trip ? res.json(trip) : res.status(500).send();
  } catch (err) {
    next(err);
  }
};

TripController.retrieve = async(req, res, next) => {
  try {
    var trip = await TripService.getById(req.params.tripId);

    if (trip && trip.driverId){
      var driver = await DriverService.getById(trip.driverId);
      trip.driver = {
        id: driver.id,
        userId: driver.userData.id,
        name: driver.userData.name,
        phone: driver.userData.phone,
      };
    }

    trip ? res.json(trip) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

TripController.update = async(req, res, next) => {
  // Check that the tripId's in data and params are the same.
  if (req.body.id && req.params.tripId !== req.body.id) {
    return res.status(400).json({
      status: 'error',
      type: 'updateIdMissmatch',
    });
  }

  try {
    var trip = await TripService.update(req.params.tripId, req.body);
    trip ? res.json(trip) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

TripController.updateStatus = (newStatus) => {
  return async(req, res, next) => {
    try {
      var trip = await TripService.update(
        req.params.tripId,
        {status: newStatus}
      );
      trip ? res.json(trip) : res.status(404).send();
    } catch (err) {
      next(err);
    }
  };
};

TripController.getLocation = async(req, res, next) => {
  try {
    var locationData = await TripService.getLocationData(req.params.tripId);
    locationData ? res.json(locationData) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

TripController.list = async(req, res, next) => {
  try {
    var filters = {
      onlyCurrent: req.query.onlyCurrent === 'true',
      driverName: req.query.driver ? req.query.driver : null,
      month: req.query.month ? moment(req.query.month, "MM/YYYY") : null
    };

    var tripsWithNames = await TripService.list(
      req.query.page,
      { driverName: true, clientName: true, filters: filters }
    );
    res.json(tripsWithNames);
  } catch (err) {
    next(err);
  }
};

TripController.calculateRoute = async(req, res, next) => {
  try {
    if (!(req.body.origin && req.body.destination &&
      req.body.origin.lat && req.body.destination.lat &&
      req.body.origin.lng && req.body.destination.lng)){
      res.status(400).send();
    }
    var origin = req.body.origin;
    var destination = req.body.destination;
    var waypoints = await MapsService.getWaypoints(origin, destination);
    res.json({waypoints: waypoints});
  } catch (err) {
    next(err);
  }
};
module.exports = TripController;
