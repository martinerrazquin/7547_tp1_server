'use strict';

var chai = require('chai');
var sinon = require('sinon');
var { RatingService, DriverService,
  TripService } = require('../../src/services');

var { Driver } = require('../../src/models');
var _ = require('lodash');

var data = require('./rating-service-spec-data');
var { getScore } = require('../../src/helpers/ratings-helper');

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
        var cid = c(data.driverAlreadyRatedTripData.clientId);

        try {
          await RatingService.rateDriver(cid, 1, 5);
        } catch (e) {
          chai.assert.equal(e.name, 'DriverAlreadyRated');
        }
      });

    it('should raise Format Error when rating is not integer',
      async() => {

        TripService.getById.resolves(c(data.driverAlreadyRatedTripData));
        var cid = c(data.driverAlreadyRatedTripData.clientId);

        try {
          await RatingService.rateDriver(cid, 1, 2.5);
        } catch (e) {
          chai.assert.equal(e.name, 'RatingsFormatNotMet');
        }

      });

    it('should raise Format Error when one suggestion is missing ' +
        'and rating <=3', async() => {

      TripService.getById.resolves(c(data.notRatedTripData));
      Driver.findByPk.resolves(c(data.existentDriver));
      var cid = c(data.notRatedTripData.clientId);
      try {
        await RatingService.rateDriver(cid, 1, 2,
          {app: true, driver: false});
      } catch (e) {
        chai.assert.equal(e.name, 'RatingsFormatNotMet');
      }

    });

    it('should raise WrongUserId Error when client IDs dont match', async() => {

      TripService.getById.resolves(c(data.notRatedTripData));
      Driver.findByPk.resolves(c(data.existentDriver));
      var cid = c(data.notRatedTripData.clientId) + 1;
      try {
        await RatingService.rateDriver(cid, 1, 4);
      } catch (e) {
        chai.assert.equal(e.name, 'WrongUserId');
      }

    });


    it('should return updated trip data when suggestions OK and rating <= 3',
      async() => {

        TripService.getById.resolves(c(data.notRatedTripData));
        Driver.findByPk.resolves(c(data.existentDriver));
        DriverService.update.resolves(c(data.existentDriver));
        TripService.update.callsFake(async(tripId, trip) => { return trip; });

        var cid = c(data.notRatedTripData.clientId);
        var suggs = data.driverAlreadyRatedTripData.driverRating.suggestions;
        var rat = data.driverAlreadyRatedTripData.driverRating.rating;

        var res = await RatingService.rateDriver(cid, 2, rat,
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

      var cid = c(data.notRatedTripData.clientId);
      var rat = data.driverRated4TripData.driverRating.rating;

      var res = await RatingService.rateDriver(cid, 1, rat,
        {app: true, driver: false});
      chai.assert.deepEqual(res, data.driverRated4TripData,
        'not updating trip');

    });

    describe('addRateDriver', () => {

      it('should make (1,1,1,1,1,0)-scored that declines Trip a ' +
          '(1,1,1,1,1,1) one, and its score should now be 2.5', async() => {
        Driver.findByPk.resolves(c(data.noRejectionsDriver));
        DriverService.update.callsFake(async(driverId, driver) => {
          return driver;
        });

        var expected = c(data.noRejectionsDriver);
        expected.ratings.rejections += 1;

        var res = await RatingService.addRateToDriver(1, 0);

        chai.assert.deepEqual(res, expected, 'did not increase rejections');

        chai.assert.equal(getScore(res), 2.5, 'score is not 2.5');
      });
    });

    describe('rateClient', () => {

      it('should raise AlreadyRated Error when already rated on that trip',
        async() => {
          TripService.getById.resolves(c(data.clientAlreadyRatedTripData));
          var rid = c(data.clientAlreadyRatedTripData.driverId);

          try {
            await RatingService.rateClient(rid, 1, 5);
          } catch (e) {
            chai.assert.equal(e.name, 'ClientAlreadyRated');
          }
        });

      it('should raise Format Error when rating is not integer',
        async() => {
          TripService.getById.resolves(c(data.clientAlreadyRatedTripData));
          var rid = c(data.clientAlreadyRatedTripData.driverId);

          try {
            await RatingService.rateClient(rid, 1, 2.5);
          } catch (e) {
            chai.assert.equal(e.name, 'RatingsFormatNotMet');
          }
        });

      it('should return updated trip data when ratings and comments are ok',
        async() => {

          TripService.getById.resolves(c(data.notRatedTripData));
          TripService.update.callsFake(async(tripId, trip) => {
            return trip;
          });

          var rid = c(data.notRatedTripData.driverId);
          var comments = c(data.clientAlreadyRatedTripData
            .clientRating.comments);
          var rat = c(data.clientAlreadyRatedTripData.clientRating.rating);

          var res = await RatingService.rateClient(rid, 1, rat, comments);
          chai.assert.deepEqual(res, data.clientAlreadyRatedTripData,
            'not updating trip');

        });

    });


  });
});
