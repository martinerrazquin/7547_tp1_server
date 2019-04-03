'use strict';

var chai = require('chai');
var sinon = require('sinon');
var { MapsService, CoordinatesService } = require('../../src/services');


describe('Coordinates Service Test', () => {

  before(() => {
    sinon.stub(MapsService, 'places');
  });

  after(() => {
    MapsService.places.restore();
  });


  var mock_correct_response = {
    json: {
      html_attributions: [],
      results: [
        {
          formatted_address: 'Rafael Obligado 6692, ' +
              'B1606AOP Villa Adelina, Buenos Aires, Argentina',
          geometry: {
            location: {
              lat: -34.5311936,
              lng: -58.54854270000001,
            },
            viewport: {
              northeast: {
                lat: -34.52981787010728,
                lng: -58.54722737010728,
              },
              southwest: {
                lat: -34.53251752989272,
                lng: -58.54992702989272,
              },
            },
          },
          icon: 'https://maps.gstatic.com/mapfiles/place_api/' +
              'icons/geocode-71.png',
          id: 'acec885b04b95753ff7f652bceb2e7b10997518b',
          name: 'Rafael Obligado 6692',
          place_id: 'ChIJJRvFAqSwvJURV3WLE561pQo',
          plus_code: {
            compound_code: 'FF92+GH Villa Adelina, ' +
                'Buenos Aires Province, Argentina',
            global_code: '48Q3FF92+GH',
          },
          reference: 'ChIJJRvFAqSwvJURV3WLE561pQo',
          types: [
            'street_address',
          ],
        },
      ],
      status: 'OK',
    },
  };

  var mock_correct_data = {
    lat: -34.5311936,
    lng: -58.54854270000001,
    formatted_address: 'Rafael Obligado 6692, ' +
        'B1606AOP Villa Adelina, Buenos Aires, Argentina',
  };

  describe('get_coords', () => {
    it('should return correct response when direction gives results',
      async() => {


        MapsService.places.resolves(mock_correct_response);


        var result = await CoordinatesService
          .get_coords('rafael obligado 6692');

        console.log(result); // DEBUG

        chai.assert.deepEqual(result, mock_correct_data,
          'Result does not match expected one');
      });

    /*
    it('should return error 400 when no direction is passed', async() => {
      var res = await chai.request(app)
          .get('/coordinates');

      chai.assert.strictEqual(res.status, 400, 'Status was not 400');
    });
     */

  });

});
