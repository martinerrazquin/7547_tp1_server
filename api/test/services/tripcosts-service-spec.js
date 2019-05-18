'use strict';

var chai = require('chai');
var sinon = require('sinon');
var { TripCostsService, MapsService } = require('../../src/services');

var { TripCost } = require('../../src/models');
var _ = require('lodash');

var data = require('./tripcosts-service-spec-data');

var c = data => _.cloneDeep(data);

describe('TripCosts Service Test', () => {

  before(() => {
    sinon.stub(TripCost, 'create').callsFake(
      async(bcData) => {
        bcData.createdAt = new Date();
        bcData.updatedAt = new Date();
        return bcData;
      });
    sinon.stub(MapsService, 'googleMapsDistance');
    sinon.stub(TripCostsService, 'retrieve');
  });

  after(() => {
    sinon.restore();
  });

  beforeEach(() => {
    sinon.resetHistory();
  });

  describe('newTripCosts', () => {

    it('should raise BadFormat error when req lacking a field',
      async() => {

        try {
          await TripCostsService.newTripCosts(
            c(data.tripCostsLackingFieldValues));
        } catch (err) {
          chai.assert.equal(err.name, 'BadFormat',
            'wrong error name');
        }

      });

    it('should raise BadFormat error when a field is negative',
      async() => {

        try {
          await TripCostsService.newTripCosts(
            c(data.tripCostsOneNegativeValues));
        } catch (err) {
          chai.assert.equal(err.name, 'BadFormat',
            'wrong error name');
        }
      });

    it('should return updated data when all fields are ok',
      async() => {

        var res = await TripCostsService.newTripCosts(
          c(data.tripCostsOKValues));
        var expected = c(data.tripCostsOKValues);

        // delete date values
        delete res.createdAt;
        delete res.updatedAt;

        chai.assert.deepEqual(res, expected,
          'tripcosts not updated correctly');

      });
  });

  describe('calculateCost', () => {

    it('should return expected cost value',
      async() => {
        var fakeDist = 10;
        var d = c(data.tripCostsOKValues);
        var trip = c(data.tripData);

        TripCostsService.retrieve.returns(d);
        MapsService.googleMapsDistance.returns(fakeDist);

        var res = await TripCostsService.calculateCost(
          trip);
        var expected = (d.k1 * trip.petQuantities.small +
          d.k2 * trip.petQuantities.medium +
          d.k3 * trip.petQuantities.big +
          d.k4 * (trip.bringsEscort ? 1 : 0)) *
          fakeDist * d.k5 + d.k6;


        chai.assert.deepEqual(res, expected,
          'trip costs not calculated correctly');

      });
  });


});
