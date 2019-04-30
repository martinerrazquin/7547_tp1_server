'use strict';

var chai = require('chai');
var sinon = require('sinon');
var { DriverService, DriverSelectionService } = require('../../src/services');

var data = require('./driver-selection-service-spec-data');

describe('Driver Selection Service Test', () => {

  before(() => {
    sinon.stub(DriverService, 'getInsideRegion');
  });

  after(() => {
    DriverService.getInsideRegion.restore();
  });


  describe('getDriver', () => {
    it('should return a result when drivers available',
      async() => {

        var driversPack = [
          data.unreachable_from_origin_best_ratings_best_nor_driverData,
          data.close_to_origin_best_ratings_best_nor_driverData,
          data.close_to_origin_best_ratings_good_nor_driverData,
          data.far_from_origin_best_ratings_good_nor_driverData,
        ];

        DriverService.getInsideRegion.resolves(driversPack);


        var result = await DriverSelectionService.getDriver(data.tripData);


        chai.assert.include(driversPack, result,
          'Result is not included in possible drivers');
      });


    it('should return null when no drivers are found', async() => {

      var driversPack = [];

      DriverService.getInsideRegion.resolves(driversPack);

      var result = await DriverSelectionService.getDriver(data.tripData);

      chai.assert.equal(result, null,
        'Result is not null when no drivers available');
    });


    it('should return null when all drivers are unreachable', async() => {

      var driversPack = [
        data.unreachable_from_origin_best_ratings_best_nor_driverData];

      DriverService.getInsideRegion.resolves(driversPack);

      var result = await DriverSelectionService.getDriver(data.tripData);

      chai.assert.equal(result, null,
        'Result is not null when no drivers reachable');
    });

    it('should return best result when best drivers available',
      async() => {

        var driversPack = [
          data.near_origin_best_ratings_best_nor_driverData,
          data.near_origin_best_ratings_good_nor_driverData,
          data.close_to_origin_best_ratings_good_nor_driverData,
          data.far_from_origin_best_ratings_good_nor_driverData,
        ];

        DriverService.getInsideRegion.resolves(driversPack);


        var result = await DriverSelectionService.getDriver(data.tripData);


        chai.assert.deepEqual(
          data.near_origin_best_ratings_best_nor_driverData, result,
          'Best driver is not selected');
      });

    it('should return nearest result if better drivers are further',
      async() => {

        var driversPack = [
          data.near_origin_best_ratings_good_nor_driverData,
          data.close_to_origin_best_ratings_best_nor_driverData,
          data.far_from_origin_best_ratings_good_nor_driverData,
        ];

        DriverService.getInsideRegion.resolves(driversPack);


        var result = await DriverSelectionService.getDriver(data.tripData);


        chai.assert.deepEqual(
          data.near_origin_best_ratings_good_nor_driverData, result,
          'Nearest driver is not selected');
      });

    it('should return one of two given two best options',
      async() => {

        var bestOptions = [
          data.close_to_origin_best_ratings_good_nor_driverData2,
          data.close_to_origin_best_ratings_good_nor_driverData,
        ];

        var driversPack = bestOptions.concat(
          data.far_from_origin_best_ratings_good_nor_driverData,
          data.unreachable_from_origin_best_ratings_best_nor_driverData
        );
        DriverService.getInsideRegion.resolves(driversPack);


        var result = await DriverSelectionService.getDriver(data.tripData);


        chai.assert.include(
          bestOptions, result,
          'Driver selected is not one of the best options');
      });

  });

});
