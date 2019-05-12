'use strict';

var chai = require('chai');
var sinon = require('sinon');
var { TripService } = require('../../src/services');

var { /* Driver,*/ Trip, User } = require('../../src/models');
var _ = require('lodash');

const tripList = async(page = 0) => {
  return TripService.list(page, {driverName: true, clientName: true});
};

describe('Trip Service', () => {

  before(() => {
    sinon.stub(User, 'findByPk');
    sinon.stub(Trip, 'findAll');
  });

  after(() => {
    sinon.restore();
  });

  beforeEach(() => {
    sinon.resetHistory();
  });

  describe('list', () => {

    it('should return empty array when no results were found', async() => {
      Trip.findAll.resolves([]);
      var res = await tripList();
      chai.assert.deepEqual(res, [], 'not empty');

    });

    it('should return same obj with driverName and clientName fields ' +
        'if results found with proper ids', async() => {
      var mockedName = 'Don Pepito';
      var obj = {clientId: 1, driver: {userId: 2}};
      obj.toJSON = () => obj;
      var mockedTrips = [obj];

      var expected = _.cloneDeep(mockedTrips);
      expected[0].clientName = mockedName;
      expected[0].driverName = mockedName;

      User.findByPk.resolves({name: mockedName});
      Trip.findAll.resolves(mockedTrips);

      var res = await tripList();

      chai.assert.deepEqual(res, expected, 'not the same');
    });
  });

});
