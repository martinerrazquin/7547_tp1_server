'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var app = require('../../src/app');
var { Trip } = require('../../src/models');

chai.use(chaiHttp);

describe('Trip Routes Test', () => {
  before(() => {
    sinon.stub(Trip, 'create');
    sinon.stub(Trip, 'findByPk');
    sinon.stub(Trip, 'update');
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
    status: 'Buscando',
    driverId: null,
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
    status: 'En camino',
    driverId: 1,
    driver: {
      id: 1,
      userId: 2,
      currentLocation: {
        lng: -58.54854270000001,
        lat: -34.5311936,
      },
      createdAt: '2019-04-05T17:05:10.939Z',
      updatedAt: '2019-04-05T17:05:10.939Z',
    },
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
});
