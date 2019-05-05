'use strict';

var chai = require('chai');

var { getScore, getNumberOfRatings } =
    require('../../src/helpers/ratings-helper');


function mockDriverData(_one, _two, _three, _four, _five, _rejections) {
  return {
    currentLocation: {
      lat: 34,
      lng: 30,
    },
    ratings: {
      one: _one,
      two: _two,
      five: _three,
      four: _four,
      three: _five,
      rejections: _rejections,
    },
    suggestions: {
      app: 1,
      driver: 1,
      vehicle: 1,
    },
    status: 'Disponible',
  };
}

describe('Ratings Helper', () => {

  describe('get Score', () => {

    it('should be 2.5 when ratings are (1,1,1,1,1,1)', async() => {
      var driver = mockDriverData(1, 1, 1, 1, 1, 1);
      var expected = 2.5;

      chai.assert.equal(getScore(driver), expected,
        'does not match expected value');
    });

    it('should be 1.5 when ratings are (1,1,1,1,1,5)', async() => {
      var driver = mockDriverData(1, 1, 1, 1, 1, 5);
      var expected = 1.5;

      chai.assert.equal(getScore(driver), expected,
        'does not match expected value');
    });

  });

  describe('get Score', () => {

    it('should be 6 when ratings are (1,1,1,1,1,1)', async() => {
      var driver = mockDriverData(1, 1, 1, 1, 1, 1);
      var expected = 6;

      chai.assert.equal(getNumberOfRatings(driver), expected,
        'does not match expected value');
    });

    it('should be 10 when ratings are (1,1,1,1,1,5)', async() => {
      var driver = mockDriverData(1, 1, 1, 1, 1, 5);
      var expected = 10;

      chai.assert.equal(getNumberOfRatings(driver), expected,
        'does not match expected value');
    });

  });
});
