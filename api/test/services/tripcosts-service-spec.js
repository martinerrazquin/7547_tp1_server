'use strict';

var chai = require('chai');
var sinon = require('sinon');
var { TripCostsService } = require('../../src/services');

// var { BusinessConstant } = require('../../src/models');
var _ = require('lodash');

var data = require('./tripcosts-service-spec-data');

var c = data => _.cloneDeep(data);

describe('TripCosts Service Test', () => {

  before(() => {
    sinon.stub(TripCostsService, 'newTripCosts').callsFake(
      async(bcData) => {
        bcData.createdAt = new Date();
        bcData.updatedAt = new Date();
        return bcData;
      });
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

});
