'use strict';

var chai = require('chai');
var sinon = require('sinon');
var { MapsService } = require('../../src/services');


describe('MapsService Service Test', () => {

  before(() => {
    sinon.stub(MapsService, 'getDirections');
  });

  after(() => {
    sinon.restore();
  });

  beforeEach(() => {
    sinon.resetHistory();
  });

  describe('googleMapsDistance', () => {

    it('should raise NoRoutesFound error when no routes are found',
      async() => {

        MapsService.getDirections.resolves({});
        try {
          await MapsService.googleMapsDistance({lat: 1, lng: 1},
            {lat: 1, lng: 1});
        } catch (err) {
          chai.assert.equal(err.name, 'NoRoutesFound',
            'wrong error name');
        }

      });

    it('should return distance in km when google\' response is ok',
      async() => {

        var fakeDist = 10;
        MapsService.getDirections.resolves({routes: [
          {legs: [
            {
              distance: {value: fakeDist},
            },
          ]},
        ]});

        var res = await MapsService.googleMapsDistance({lat: 1, lng: 1},
          {lat: 1, lng: 1});
        var expected = fakeDist / 1000;


        chai.assert.deepEqual(res, expected,
          'distance not formatted correctly');

      });

  });


});
