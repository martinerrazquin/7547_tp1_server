'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var app = require('../../src/app');
var { Trip, Driver } = require('../../src/models');

chai.use(chaiHttp);

describe('Trip Routes Test', () => {
  before(() => {
    sinon.stub(Trip, 'create');
    sinon.stub(Trip, 'findByPk');
    sinon.stub(Trip, 'update');
    sinon.stub(Driver, 'create');
  });

  beforeEach(() => {
    sinon.resetHistory();
  });

  after(() => {
    sinon.restore();
  });

  var tripData = {
    id: 1,
    origin: {
      lat: 0,
      lng: 0,
    },
    destination: {
      lat: 0,
      lng: 0,
    },
    petQuantities: {
      small: 0,
      medium: 1,
      big: 0,
    },
    bringsEscort: false,
    paymentMethod: 'cash',
    comments: '',
    status: 'Buscando',
    driverId: null,
  };

  var driverData = {
    id: 1,
    userId: null,
    currentLocation: {
      lng: -58.54854270000001,
      lat: -34.5311936,
    },
    createdAt: '2019-04-05T17:05:10.939Z',
    updatedAt: '2019-04-05T17:05:10.939Z',
  };

  var confirmedTripData = {
    id: 1,
    origin: {
      lat: 0,
      lng: 0,
    },
    destination: {
      lat: 0,
      lng: 0,
    },
    petQuantities: {
      small: 0,
      medium: 1,
      big: 0,
    },
    bringsEscort: false,
    paymentMethod: 'cash',
    comments: '',
    status: 'En camino',
    driverId: 1,
    driver: driverData,
  };

  var expectedEnCaminoLocationdata = {
    status: 'En camino',
    currentLocation: {
      lng: -58.54854270000001,
      lat: -34.5311936,
    },
  };

  var expectedBuscandoLocationdata = {
    status: 'Buscando',
    currentLocation: null,
  };


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
      Trip.findByPk.returns(tripData);

      var res = await chai.request(app).get('/trips/1');

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        tripData,
        'Response was not what was expected'
      );
    });
  });

  describe('POST /trips', () => {
    it('should return ok when trip is valid', async() => {
      Trip.create.returns(tripData);

      var res = await chai.request(app)
        .post('/trips')
        .send({
          origin: tripData.origin,
          destination: tripData.destination,
        });

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        tripData,
        'Response was not what was expected'
      );
    });
  });

  describe('PUT /trips', () => {
    it('should return ok when new trip data is valid', async() => {
      Trip.update.returns([1, [tripData]]);

      var res = await chai.request(app)
        .put('/trips/1')
        .send({
          origin: tripData.origin,
          destination: tripData.destination,
        });

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        tripData,
        'Response was not what was expected'
      );
    });

    it('should return invalid when there\'s an id missmatch', async() => {
      Trip.update.returns([1, [tripData]]);

      var res = await chai.request(app)
        .put('/trips/2')
        .send({
          id: 1,
          origin: tripData.origin,
          destination: tripData.destination,
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

      Trip.findByPk.returns(confirmedTripData);

      var res = await chai.request(app).get('/trips/1/location');

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        expectedEnCaminoLocationdata,
        'Response was not what was expected'
      );
    });

    it('should return both 0 coordinates when ' +
        'trip is in "Buscando" state', async() => {

      Trip.findByPk.returns(tripData);

      var res = await chai.request(app).get('/trips/1/location');

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        expectedBuscandoLocationdata,
        'Response was not what was expected'
      );
    });
  });

  describe('POST /trips/simulated', () => {
    it('should return ok when trip is valid', async() => {
      Trip.create.returns(tripData);
      Driver.create.returns(driverData);
      Trip.update.returns([0, [confirmedTripData]]);

      var res = await chai.request(app)
        .post('/trips/simulated')
        .send({
          origin: tripData.origin,
          destination: tripData.destination,
        });

      chai.assert.strictEqual(
        res.status,
        200,
        'Status was not 200'
      );
      chai.assert.deepEqual(
        res.body,
        confirmedTripData,
        'Response was not what was expected'
      );
    });
  });
});
