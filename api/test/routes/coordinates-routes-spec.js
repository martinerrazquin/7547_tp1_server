'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../src/app');

chai.use(chaiHttp);

describe('Coordinates Routes Test', () => {

  describe('GET /coordinates', () => {
    it('should return correct coordinates when well ' +
        'specified direction is passed',
    async() => {
      var res = await chai.request(app)
        .get('/coordinates')
        .send({
          direction: 'rafael obligado 6692',
        });

      var mock_correct_data = {
        lat: -34.5311936,
        lng: -58.54854270000001,
        formatted_address: 'Rafael Obligado 6692, ' +
          'B1606AOP Villa Adelina, Buenos Aires, Argentina',
      };

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
        .send({
          direction: '  ',
        });

      chai.assert.strictEqual(res.status, 400, 'Status was not 400');
    });

  });

});
