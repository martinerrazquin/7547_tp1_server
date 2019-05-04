'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var app = require('../../src/app');
var { User, Driver } = require('../../src/models');
var { auth } = require('../../src/middleware');

var data = require('./driver-routes-spec-data');

chai.use(chaiHttp);

describe('Driver Routes Test', () => {
  var user = null;
  before(() => {
    sinon.stub(User, 'findOne');
    sinon.stub(User, 'scope');
    sinon.stub(auth, '_facebookAuth');
    auth._facebookAuth.callsFake((req, res, next) => {
      req.user = user;
      next();
    });
    sinon.stub(Driver, 'update');
    Driver.update.callsFake((newData) => {
      return [1, [Object.assign({}, data.driverUser.driverData, newData)]];
    });
  });

  // var clock;

  beforeEach(() => {
    user = null;
    sinon.resetHistory();
    // clock = sinon.useFakeTimers();
  });

  after(() => {
    sinon.restore();
  });

  describe('PUT /drivers/status', () => {
    it('should return ok when new data is valid and user is authenticated',
      async() => {
        user = data.driverUser;
        var newData = {
          currentLocation: {
            lat: 34.01,
            lng: 29.99,
          },
          status: 'No disponible',
        };

        var res = await chai.request(app)
          .put('/drivers/status')
          .send(newData);

        chai.assert.strictEqual(
          res.status,
          200,
          'Status was not 200'
        );
      });

    it('should return invalid when user is not authenticated',
      async() => {
        user = null;
        var newData = {
          currentLocation: {
            lat: 34.01,
            lng: 29.99,
          },
          status: 'No disponible',
        };

        var res = await chai.request(app)
          .put('/drivers/status')
          .send(newData);

        chai.assert.strictEqual(
          res.status,
          403,
          'Status was not 403'
        );
      });
  });
});
