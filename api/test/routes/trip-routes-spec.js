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
    Trip.create.resetHistory();
    Trip.findByPk.resetHistory();
    Trip.update.resetHistory();
  });

  after(() => {
    Trip.create.restore();
    Trip.findByPk.restore();
    Trip.update.restore();
  });

  var tripData = {
    id: 1,
    origin: 'some origin',
    destination: 'some destination',
    status: 'En camino',
    driverId: null,
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
          origin: 'some origin',
          destination: 'some destination',
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
});