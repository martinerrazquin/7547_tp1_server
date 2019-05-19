'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var app = require('../../src/app');
var { Trip, Driver } = require('../../src/models');
var { MapsService, DriverSelectionService,
  TripCostsService } = require('../../src/services');
var { auth } = require('../../src/middleware');
var _ = require('lodash');

var data = require('./trip-routes-spec-data');

var c = data => _.cloneDeep(data);

chai.use(chaiHttp);

const EXPECTED_COST = 10.2;

describe('Trip Routes Test', () => {
  before(() => {
    sinon.stub(Trip, 'create');
    sinon.stub(Trip, 'findOne');
    sinon.stub(Trip, 'update');
    sinon.stub(Driver, 'create');
    sinon.stub(Driver, 'update');
    sinon.stub(MapsService, 'getDirections');
    sinon.stub(DriverSelectionService, 'startDriverSearch');
    DriverSelectionService.startDriverSearch.resolves();
    sinon.stub(DriverSelectionService, 'getDriver');
    DriverSelectionService.getDriver.resolves(data.driverData);
    sinon.stub(auth, '_facebookAuth');
    auth._facebookAuth.callsFake((req, res, next) => {
      req.user = data.userData;
      next();
    });
    sinon.stub(auth, '_authenticate');
    auth._authenticate.callsFake((req, res, next) => {
      req.user = data.userData;
      next();
    });
    sinon.stub(TripCostsService, 'calculateCost');
    TripCostsService.calculateCost.resolves(EXPECTED_COST);
  });

  var clock;

  beforeEach(() => {
    sinon.resetHistory();
    clock = sinon.useFakeTimers();
  });

  after(() => {
    sinon.restore();
  });

  describe('GET /trips/:tripId', () => {
    it('should return invalid when trip does not exist', async() => {
      Trip.findOne.returns(null);

      var res = await chai.request(app).get('/trips/10');

      chai.assert.strictEqual(
        res.status,
        404,
        'Status was not 404'
      );
    });

    it('should return trip data when trip exists', async() => {
      Trip.findOne.returns(data.tripData);

      var res = await chai.request(app).get('/trips/1');

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        data.tripData,
        'Response was not what was expected'
      );
    });
  });

  describe('POST /trips', () => {
    it('should return ok when trip is valid', async() => {
      var expected = c(data.tripData);
      expected.cost = EXPECTED_COST;

      Trip.create.returns(expected);

      var res = await chai.request(app)
        .post('/trips')
        .send({
          origin: data.tripData.origin,
          destination: data.tripData.destination,
        });

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        expected,
        'Response was not what was expected'
      );
    });
  });

  describe('PUT /trips', () => {
    it('should return ok when new trip data is valid', async() => {
      Trip.update.returns([1, [data.tripData]]);

      var res = await chai.request(app)
        .put('/trips/1')
        .send({
          origin: data.tripData.origin,
          destination: data.tripData.destination,
        });

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        data.tripData,
        'Response was not what was expected'
      );
    });

    it('should return invalid when there\'s an id missmatch', async() => {
      Trip.update.returns([1, [data.tripData]]);

      var res = await chai.request(app)
        .put('/trips/2')
        .send({
          id: 1,
          origin: data.tripData.origin,
          destination: data.tripData.destination,
        });

      chai.assert.strictEqual(
        res.status,
        400,
        'Status was not 400'
      );
      chai.assert.deepEqual(
        res.body,
        { status: 'error', type: 'updateIdMissmatch' },
        'Response was not what was expected'
      );
    });
  });

  describe('GET /trips/:tripId/location', () => {
    it('should return 404 when trip does not exist', async() => {
      Trip.findOne.returns(null);


      var res = await chai.request(app).get('/trips/1/location');

      chai.assert.strictEqual(res.status,
        404,
        'Status was not 404');
    });


    it('should return both correct coordinates when ' +
        'trip is in "En camino" state', async() => {

      Trip.findOne.returns(data.confirmedTripData);

      var res = await chai.request(app).get('/trips/1/location');

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        data.expectedEnCaminoLocationdata,
        'Response was not what was expected'
      );
    });

    it('should return null coordinates when ' +
        'trip is in "Buscando" state', async() => {

      Trip.findOne.returns(data.tripData);

      var res = await chai.request(app).get('/trips/1/location');

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        data.expectedBuscandoLocationdata,
        'Response was not what was expected'
      );
    });
  });

  describe('POST /trips/simulated', () => {
    it('should return ok when trip is valid', async() => {
      Trip.create.returns(data.tripData);
      Driver.create.returns(data.driverData);
      Trip.update.returns([0, [data.confirmedTripData]]);
      MapsService.getDirections.returns(null);

      var res = await chai.request(app)
        .post('/trips/simulated')
        .send({
          origin: data.tripData.origin,
          destination: data.tripData.destination,
        });

      var expected = c(data.confirmedTripData);
      expected.cost = EXPECTED_COST;

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        data.confirmedTripData,
        'Response was not what was expected'
      );
    });

    it('should update position after trip is created', async() => {
      Trip.create.returns(data.tripData);
      Driver.create.returns(data.driverData);
      Trip.update.returns([0, [data.confirmedTripData]]);
      var updatedDriver = data.driverData;
      Trip.findOne.callsFake(() => {
        var { ... udpatedData } = data.confirmedTripData;
        udpatedData.driver = updatedDriver;
        return udpatedData;
      });
      Driver.update.callsFake((arg) => {
        updatedDriver = arg;
        return [1, [arg]];
      });
      MapsService.getDirections.returns(data.directionData);

      clock.tick(10000);
      await chai.request(app)
        .post('/trips/simulated')
        .send({
          origin: data.tripData.origin,
          destination: data.tripData.destination,
        });

      var res = await chai.request(app)
        .get('/trips/1/location');

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );

      chai.assert.strictEqual(
        res.body.status,
        'En camino',
        'Response was not what was expected'
      );

      chai.assert.isFalse(
        res.body.currentLocation ===
        data.expectedEnCaminoLocationdata.currentLocation,
        'Response was not what was expected'
      );
    });
  });

  describe('POST /info/route', () => {

    it('should return 400 when no routes found', async() => {
      MapsService.getDirections.resolves({});

      var res = await chai.request(app)
        .post('/info/route')
        .send({
          origin: data.tripData.origin,
          destination: data.tripData.destination,
        });

      chai.assert.strictEqual(
        res.status,
        400,
        'Status was not 400'
      );

    });

    it('should return list of waypoints when route is found', async() => {
      MapsService.getDirections.resolves(data.mockRouteData);

      var res = await chai.request(app)
        .post('/info/route')
        .send({
          origin: data.tripData.origin,
          destination: data.tripData.destination,
        });

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );

      chai.assert.deepEqual(
        res.body.waypoints,
        [{lat: 1, lng: 1},
          {lat: 2, lng: 2},
          {lat: 3, lng: 3},
          {lat: 4, lng: 4 }],
        'Response was not what was expected'
      );

    });
  });
});
