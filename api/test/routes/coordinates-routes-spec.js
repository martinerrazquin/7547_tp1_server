'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../src/app');
var sinon = require('sinon');
var { CoordinatesService } = require('../../src/services');
chai.use(chaiHttp);


describe('Coordinates Routes Test', () => {


  before(() => {
    sinon.stub(CoordinatesService, 'get_coords');
  });

  after(() => {
    CoordinatesService.get_coords.restore();
  });
  /*
  var correct_response = {
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
  };
  */

  describe('GET /coordinates', () => {
    it('should return correct coordinates when well ' +
        'specified direction is passed',
    async() => {

      var mock_correct_data = {
        lat: -34.5311936,
        lng: -58.54854270000001,
        formatted_address: 'Rafael Obligado 6692, ' +
            'B1606AOP Villa Adelina, Buenos Aires, Argentina',
      };

      CoordinatesService.get_coords.resolves(mock_correct_data);


      var res = await chai.request(app)
        .get('/coordinates')
        .query({
          direction: 'rafael obligado 6692',
        });


      chai.assert.strictEqual(res.status,
        200, 'Status was not 200');

      chai.assert.deepEqual(res.body,
        mock_correct_data,
        'Response was not what was expected');
    });

    it('should return error 400 when no direction is passed', async() => {
      var res = await chai.request(app)
        .get('/coordinates');

      chai.assert.strictEqual(res.status, 400, 'Status was not 400');
    });

    it('should return error 400 when blank direction is passed', async() => {
      var res = await chai.request(app)
        .get('/coordinates')
        .query({
          direction: '  ',
        });

      chai.assert.strictEqual(res.status, 400, 'Status was not 400');
    });

    it('should return error 404 when non-existant direction is passed',
      async() => {
        var e = new Error();
        e.name = 'NoResultsFoundOnSearch';
        CoordinatesService.get_coords.rejects(e);

        var res = await chai.request(app)
          .get('/coordinates')
          .query({direction: 'rafael obligado 6696'});

        chai.assert.strictEqual(res.status, 404, 'Status was not 404');
      });
  });

});
