'use strict';

var chai = require('chai');
var sinon = require('sinon');
var { RatingService, DriverService,
  TripService } = require('../../src/services');

var { Driver } = require('../../src/models');
var _ = require('lodash');

var data = require('./rating-service-spec-data');

var c = data => _.cloneDeep(data);

describe('Rating Service Test', () => {

  before(() => {
    sinon.stub(DriverService, 'update');
    sinon.stub(Driver, 'findByPk');
    sinon.stub(TripService, 'getById');
    sinon.stub(TripService, 'update');
  });

  after(() => {
    sinon.restore();
  });

  beforeEach(() => {
    sinon.resetHistory();
  });

  describe('rate driver', () => {

    it('should raise AlreadyRated Error when already rated on that trip',
      async() => {
        TripService.getById.resolves(c(data.driverAlreadyRatedTripData));

        try {
          await RatingService.rateDriver(1, 5);
        } catch (e) {
          chai.assert.equal(e.name, 'DriverAlreadyRated');
        }
      });

    it('should raise Format Error when rating is not integer',
      async() => {

        TripService.getById.resolves(c(data.driverAlreadyRatedTripData));

        try {
          await RatingService.rateDriver(1, 2.5);
        } catch (e) {
          chai.assert.equal(e.name, 'RatingsFormatNotMet');
        }

      });

    it('should raise Format Error when one suggestion is missing ' +
        'and rating <=3', async() => {

      TripService.getById.resolves(c(data.notRatedTripData));
      Driver.findByPk.resolves(c(data.existentDriver));

      try {
        await RatingService.rateDriver(1, 2,
          {app: true, driver: false});
      } catch (e) {
        chai.assert.equal(e.name, 'RatingsFormatNotMet');
      }

    });


    it('should return updated trip data when suggestions OK and rating <= 3',
      async() => {

        TripService.getById.resolves(c(data.notRatedTripData));
        Driver.findByPk.resolves(c(data.existentDriver));
        DriverService.update.resolves(c(data.existentDriver));
        TripService.update.callsFake(async(tripId, trip) => { return trip; });

        var suggs = data.driverAlreadyRatedTripData.driverRating.suggestions;
        var rat = data.driverAlreadyRatedTripData.driverRating.rating;

        var res = await RatingService.rateDriver(2, rat,
          suggs);
        chai.assert.deepEqual(res, data.driverAlreadyRatedTripData,
          'not updating trip');

      });

    it('should return updated trip data when one suggestion is missing ' +
        'but rating > 3', async() => {

      TripService.getById.resolves(c(data.notRatedTripData));
      Driver.findByPk.resolves(c(data.existentDriver));
      DriverService.update.resolves(c(data.existentDriver));
      TripService.update.callsFake(async(tripId, trip) => { return trip; });

      var rat = data.driverRated4TripData.driverRating.rating;

      var res = await RatingService.rateDriver(1, rat,
        {app: true, driver: false});
      chai.assert.deepEqual(res, data.driverRated4TripData,
        'not updating trip');

    });


  });
});
