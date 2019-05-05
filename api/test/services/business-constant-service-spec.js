'use strict';

var chai = require('chai');
var sinon = require('sinon');
var { BusinessConstantService } = require('../../src/services');

// var { BusinessConstant } = require('../../src/models');
var _ = require('lodash');

var data = require('./business-constant-service-spec-data');

var c = data => _.cloneDeep(data);

describe('BusinessConstant Service Test', () => {

  before(() => {
    sinon.stub(BusinessConstantService, 'update').callsFake(
      async(bcName, bcData) => { return bcData; });
  });

  after(() => {
    sinon.restore();
  });

  beforeEach(() => {
    sinon.resetHistory();
  });

  describe('updateTripCosts', () => {

    it('should raise BadFormat error when req lacking a field',
      async() => {

        try {
          await BusinessConstantService.updateTripCosts(
            c(data.tripCostsLackingFieldValues));
        } catch (err) {
          chai.assert.equal(err.name, 'BadFormat',
            'wrong error name');
        }

      });

    it('should raise BadFormat error when a field is negative',
      async() => {

        try {
          await BusinessConstantService.updateTripCosts(
            c(data.tripCostsOneNegativeValues));
        } catch (err) {
          chai.assert.equal(err.name, 'BadFormat',
            'wrong error name');
        }
      });

    it('should return updated data when all fields are ok',
      async() => {

        var res = await BusinessConstantService.updateTripCosts(
          c(data.tripCostsOKValues));
        var expected = {value: c(data.tripCostsOKValues)};

        chai.assert.deepEqual(res, expected,
          'tripcosts not updated correctly');

      });
  });

});
