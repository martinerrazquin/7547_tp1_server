'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var app = require('../../src/app');
var { Trip, Driver } = require('../../src/models');
var { MapsService } = require('../../src/services');

var data = require('./trip-routes-spec-data');

chai.use(chaiHttp);

describe('Trip Routes Test', () => {
  before(() => {
    sinon.stub(Trip, 'create');
    sinon.stub(Trip, 'findByPk');
    sinon.stub(Trip, 'update');
    sinon.stub(Driver, 'create');
    sinon.stub(Driver, 'update');
    sinon.stub(MapsService, 'getDirections');
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
      Trip.findByPk.returns(null);

      var res = await chai.request(app).get('/trips/10');

      chai.assert.strictEqual(
        res.status,
        404,
        'Status was not 404'
      );
    });

    it('should return trip data when trip exists', async() => {
      Trip.findByPk.returns(data.tripData);

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
      Trip.create.returns(data.tripData);

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
        data.tripData,
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
      Trip.findByPk.returns(null);


      var res = await chai.request(app).get('/trips/1/location');

      chai.assert.strictEqual(res.status,
        404,
        'Status was not 404');
    });


    it('should return both correct coordinates when ' +
        'trip is in "En camino" state', async() => {

      Trip.findByPk.returns(data.confirmedTripData);

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

      Trip.findByPk.returns(data.tripData);

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
      Trip.findByPk.callsFake(() => {
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
});
